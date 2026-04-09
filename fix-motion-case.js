const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    if(!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const targetDirs = ['app', 'components'];

targetDirs.forEach(dir => {
    walkDir(dir, (filePath) => {
        if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
        
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        if (content.includes('motion_div') || content.includes('motion_section') || content.includes('motion_') || content.includes('MotionDiv as motion_div')) {
            content = content.replace(/MotionDiv as motion_div/g, 'MotionDiv');
            content = content.replace(/MotionSection as motion_section/g, 'MotionSection');
            content = content.replace(/MotionLi as motion_li/g, 'MotionLi');
            content = content.replace(/MotionSpan as motion_span/g, 'MotionSpan');
            content = content.replace(/MotionP as motion_p/g, 'MotionP');
            content = content.replace(/MotionH1 as motion_h1/g, 'MotionH1');
            content = content.replace(/MotionH2 as motion_h2/g, 'MotionH2');
            content = content.replace(/MotionH3 as motion_h3/g, 'MotionH3');
            
            content = content.replace(/<motion_div/g, '<MotionDiv');
            content = content.replace(/<\/motion_div>/g, '</MotionDiv>');
            
            content = content.replace(/<motion_section/g, '<MotionSection');
            content = content.replace(/<\/motion_section>/g, '</MotionSection>');
            
            content = content.replace(/<motion_li/g, '<MotionLi');
            content = content.replace(/<\/motion_li>/g, '</MotionLi>');

            content = content.replace(/<motion_span/g, '<MotionSpan');
            content = content.replace(/<\/motion_span>/g, '</MotionSpan>');

            content = content.replace(/<motion_p/g, '<MotionP');
            content = content.replace(/<\/motion_p>/g, '</MotionP>');

            content = content.replace(/<motion_h1/g, '<MotionH1');
            content = content.replace(/<\/motion_h1>/g, '</MotionH1>');

            content = content.replace(/<motion_h2/g, '<MotionH2');
            content = content.replace(/<\/motion_h2>/g, '</MotionH2>');

            content = content.replace(/<motion_h3/g, '<MotionH3');
            content = content.replace(/<\/motion_h3>/g, '</MotionH3>');
            
            if(content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Fixed case in', filePath);
            }
        }
    });
});
