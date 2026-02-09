import { useQuery } from "@tanstack/react-query";

async function fetchActiveSponsorship(placement: string) {
  const res = await fetch(`/api/sponsorships/active?placement=${placement}`);
  if (!res.ok) throw new Error("Failed to fetch sponsorship");
  return res.json();
}

export function useActiveSponsorship(placement: string) {
  return useQuery({
    queryKey: ["sponsorship", placement],
    queryFn: () => fetchActiveSponsorship(placement),
  });
}
