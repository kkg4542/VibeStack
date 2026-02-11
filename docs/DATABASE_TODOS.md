# Database Integration TODOs

This document tracks TODO items related to database integration that need to be implemented.

## Current Status

### ✅ Completed
- [x] Stack model with Prisma ORM
- [x] StackTool join table for many-to-many relationship
- [x] Tool model integration
- [x] Basic CRUD operations for stacks
- [x] Featured stacks query with caching
- [x] Popular stacks query with caching

### ⏳ Pending Implementation

#### 1. Stack Metrics System
**Location:** `lib/data/stacks.ts` (lines 73-90, 161-168)
**Current:** Using mock metrics data
**TODO:**
- Create `StackMetrics` model in Prisma schema
- Implement actual metrics calculation from:
  - Stack view counts (StackView table)
  - User saves/favorites (UserStackFavorite table)
  - Reviews and ratings (Review table)
  - Popularity score algorithm
- Add background job to recalculate metrics daily

**Priority:** HIGH
**Impact:** Real-time popularity and ranking data

#### 2. Verified Testimonials
**Location:** `lib/data/stacks.ts` (lines 203-292)
**Current:** Mock testimonial data
**TODO:**
- Create `Testimonial` model in Prisma schema
- Fields needed:
  - id, userId, userName, userHandle
  - stackId, toolId (nullable)
  - rating, content
  - metrics (JSON): productivityGain, timeSaved, roi
  - socialProof (JSON): likes, retweets
  - verified (boolean)
  - createdAt
- Admin dashboard to approve testimonials
- Integration with Twitter/X API for verification

**Priority:** MEDIUM
**Impact:** Social proof and credibility

#### 3. Stack View Tracking
**Location:** `lib/data/stacks.ts` (lines 382-386)
**Current:** Console log only
**TODO:**
- Create `StackView` model:
  - id, stackId, userId (nullable), sessionId, createdAt
- Implement view counting with deduplication (24h window)
- Analytics dashboard for view trends

**Priority:** MEDIUM
**Impact:** Analytics and popularity metrics

#### 4. User Stack Saves/Favorites
**Location:** `lib/data/stacks.ts` (lines 389-392)
**Current:** Empty function
**TODO:**
- Create `UserStackFavorite` model:
  - id, userId, stackId, createdAt
- Implement save/unsave functionality
- Show saved stacks in user profile
- Used for calculating stack popularity

**Priority:** MEDIUM
**Impact:** User engagement metrics

#### 5. Stack Insights & Analytics
**Location:** `lib/data/stacks.ts` (lines 335-379)
**Current:** Mock trend data
**TODO:**
- Aggregate real data from:
  - StackView table (adoption trends)
  - User feedback/surveys (time saved, cost saved)
  - Tool usage within stacks
- Create time-series queries for trend analysis
- Cache insights for performance

**Priority:** LOW
**Impact:** Advanced analytics for stack authors

#### 6. Curator Information
**Location:** `lib/data/stacks.ts` (line 112, 168)
**Current:** Always null
**TODO:**
- Add curator relation to Stack model
- Fields: curatorId, curatorRole
- Allow users to claim/assign as curators
- Show curator badge and profile on stack pages

**Priority:** LOW
**Impact:** Author attribution and credibility

## Implementation Priority Order

1. **Stack Metrics System** - Required for proper ranking and display
2. **Stack View Tracking** - Foundation for all analytics
3. **User Stack Saves** - Engagement metric, affects popularity
4. **Verified Testimonials** - Social proof, marketing value
5. **Stack Insights** - Nice to have analytics
6. **Curator Information** - Author attribution

## Schema Additions Needed

```prisma
// Stack Metrics
model StackMetrics {
  id                String   @id @default(cuid())
  stackId           String   @unique
  stack             Stack    @relation(fields: [stackId], references: [id])
  views             Int      @default(0)
  saves             Int      @default(0)
  reviewCount       Int      @default(0)
  avgRating         Float    @default(0)
  popularityScore   Float    @default(0)
  updatedAt         DateTime @updatedAt
}

// Stack Views (for analytics)
model StackView {
  id          String   @id @default(cuid())
  stackId     String
  stack       Stack    @relation(fields: [stackId], references: [id])
  userId      String?
  user        User?    @relation(fields: [userId], references: [id])
  sessionId   String?
  createdAt   DateTime @default(now())
  
  @@index([stackId, createdAt])
  @@index([userId])
}

// User Stack Favorites/Saves
model UserStackFavorite {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  stackId   String
  stack     Stack    @relation(fields: [stackId], references: [id])
  createdAt DateTime @default(now())
  
  @@unique([userId, stackId])
  @@index([stackId])
}

// Verified Testimonials
model Testimonial {
  id              String   @id @default(cuid())
  userId          String?
  userName        String
  userHandle      String?
  userRole        String?
  userCompany     String?
  userAvatar      String?
  verified        Boolean  @default(false)
  stackId         String?
  stack           Stack?   @relation(fields: [stackId], references: [id])
  toolId          String?
  tool            Tool?    @relation(fields: [toolId], references: [id])
  rating          Int
  content         String
  metrics         Json?    // { productivityGain, timeSaved, roi }
  socialProof     Json?    // { likes, retweets }
  featured        Boolean  @default(false)
  approved        Boolean  @default(false)
  createdAt       DateTime @default(now())
  
  @@index([stackId])
  @@index([toolId])
  @@index([approved, featured])
}
```

## Notes

- All mock data should be replaced with real database queries
- Implement proper caching with `unstable_cache` for performance
- Consider background jobs (e.g., Bull Queue) for heavy calculations
- Maintain data privacy - don't expose individual user data
- GDPR compliance for analytics tracking
