const fs = require('fs');
const glob = require('glob'); // Not available? We can use recursive reading.
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const targetDirs = ['app', 'components'];

targetDirs.forEach(dir => {
    walkDir(dir, (filePath) => {
        if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
        
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        if (content.includes('framer-motion/client')) {
            const hasUseClient = content.includes('"use client"') || content.includes("'use client'");
            if (hasUseClient) {
                content = content.replace(/import \* as motion from ["']framer-motion\/client["'];?/g, 'import { motion } from "framer-motion";');
            } else {
                content = content.replace(
                    /import \* as motion from ["']framer-motion\/client["'];?/g,
                    'import { MotionDiv as motion_div, MotionSection as motion_section, MotionLi as motion_li, MotionSpan as motion_span, MotionP as motion_p, MotionH1 as motion_h1, MotionH2 as motion_h2, MotionH3 as motion_h3 } from "@/components/ui/motion-wrapper";'
                );
                // Also fix <motion.div to <motion_div
                content = content.replace(/motion\.div/g, 'motion_div');
                content = content.replace(/motion\.section/g, 'motion_section');
                content = content.replace(/motion\.li/g, 'motion_li');
                content = content.replace(/motion\.span/g, 'motion_span');
                content = content.replace(/motion\.p/g, 'motion_p');
                content = content.replace(/motion\.h1/g, 'motion_h1');
                content = content.replace(/motion\.h2/g, 'motion_h2');
                content = content.replace(/motion\.h3/g, 'motion_h3');
            }
            if(content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Fixed', filePath);
            }
        }
    });
});
