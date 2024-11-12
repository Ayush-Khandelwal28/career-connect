import { ResumeData } from "../types/index";

export function generateLatexFile(resumeData: ResumeData): string {
  const latex = `\\documentclass[a4paper,12pt]{article}
\\usepackage{latexsym}
\\usepackage{xcolor}
\\usepackage{float}
\\usepackage{ragged2e}
\\usepackage[empty]{fullpage}
\\usepackage{wrapfig}
\\usepackage{lipsum}
\\usepackage{tabularx}
\\usepackage{titlesec}
\\usepackage{geometry}
\\usepackage{marvosym}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage{fontawesome5}
\\usepackage{multicol}
\\usepackage{graphicx}
\\usepackage{cfr-lm}
\\usepackage[T1]{fontenc}

\\setlength{\\footskip}{4.08003pt} 
\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}
\\geometry{left=1.0cm, top=1cm, right=1cm, bottom=1cm}

\\usepackage[most]{tcolorbox}
\\tcbset{
  frame code={},
  center title,
  left=0pt,
  right=0pt,
  top=0pt,
  bottom=0pt,
  colback=gray!20,
  colframe=white,
  width=\\dimexpr\\textwidth\\relax,
  enlarge left by=-2mm,
  boxsep=4pt,
  arc=0pt,outer arc=0pt,
}

\\urlstyle{same}
\\raggedright
\\setlength{\\footskip}{4.08003pt}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-7pt}]

% Custom commands
\\newcommand{\\resumeItem}[2]{
  \\item{
    \\textbf{#1}{\\hspace{0.5mm}#2 \\vspace{-0mm}}
  }
}

\\newcommand{\\resumePOR}[3]{
\\vspace{0.5mm}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
        \\textbf{#1}\\hspace{0.3mm}#2 & {\\small{#3}} 
    \\end{tabular*}
    \\vspace{-2mm}
}

\\newcommand{\\resumeSubheading}[4]{
\\vspace{0.5mm}\\item
    \\begin{tabular*}{0.98\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
        \\textbf{#1} & {\\footnotesize{#4}} \\\\
        {\\footnotesize{#3}} &  \\footnotesize{#2}\\\\
    \\end{tabular*}
    \\vspace{-2.4mm}
}

\\newcommand{\\resumeProject}[4]{
\\vspace{0.5mm}\\item
    \\begin{tabular*}{0.98\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
        \\textbf{#1} & {\\footnotesize{#3}} \\\\
        \\footnotesize{{#2}} & \\footnotesize{#4}
    \\end{tabular*}
    \\vspace{-2.4mm}
}

\\newcommand{\\resumeSubItem}[2]{\\resumeItem{#1}{#2}\\vspace{-4pt}}

\\renewcommand{\\labelitemi}{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=*,labelsep=0mm]}
\\newcommand{\\resumeHeadingSkillStart}{\\begin{itemize}[leftmargin=*,itemsep=1.7mm, rightmargin=2ex]}
\\newcommand{\\resumeItemListStart}{\\begin{justify}\\begin{itemize}[leftmargin=3ex, rightmargin=2ex, noitemsep,labelsep=1.2mm,itemsep=0mm]\\small}

\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}\\vspace{2mm}}
\\newcommand{\\resumeHeadingSkillEnd}{\\end{itemize}\\vspace{-2mm}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\end{justify}\\vspace{-2mm}}

\\newcommand{\\cvsection}[1]{%
\\vspace{2mm}
\\begin{tcolorbox}
    \\textbf{\\large #1}
\\end{tcolorbox}
    \\vspace{-4mm}
}

\\newcolumntype{L}{>{\\raggedright\\arraybackslash}X}
\\newcolumntype{R}{>{\\raggedleft\\arraybackslash}X}
\\newcolumntype{C}{>{\\centering\\arraybackslash}X}

\\begin{document}
\\fontfamily{cmr}\\selectfont

% Header
\\begin{tabularx}{\\linewidth}{@{} C @{}}
\\Huge{Your Name} \\\\[7.5pt]
\\end{tabularx}
\\vspace{-5.5mm}

% Education
\\section{\\textbf{Education}}
\\resumeSubHeadingListStart
${resumeData.education.map(edu => `
  \\resumeSubheading
    {${edu.collegeName}}
    {${edu.courseEndYear}}
    {${edu.degreeName} in ${edu.courseName} - GPA: ${edu.currentGPA || 'N/A'}}
    {${edu.courseStartYear} - ${edu.courseEndYear}}
`).join('')}
\\resumeSubHeadingListEnd

% Work Experience
\\section{\\textbf{Experience}}
\\resumeSubHeadingListStart
${resumeData.workExperience.map(exp => `
  \\resumeSubheading
    {${exp.organizationName}}
    {${'Remote'}}
    {${exp.role}}
    {${exp.startMonth} ${exp.startYear} - ${exp.stillWorking ? 'Present' : `${exp.endMonth} ${exp.endYear}`}}
    \\resumeItemListStart
    \\item ${exp.description}
    \\resumeItemListEnd
`).join('')}
\\resumeSubHeadingListEnd

% Projects
\\section{\\textbf{Projects}}
\\resumeSubHeadingListStart
${resumeData.projects.map(project => `
  \\resumeProject
    {${project.projectName}}
    {${project.projectDescription}}
    {${project.month} ${project.year}}
    {\\href{${project.projectLink}}{Link}}
`).join('')}
\\resumeSubHeadingListEnd

% Skills
\\section{\\textbf{Skills}}
\\begin{itemize}[leftmargin=0.1in, label={}]
\\small{\\item{
${resumeData.skills.map(skill => skill.skill).join(', ')}
}}
\\end{itemize}

% Achievements
\\section{\\textbf{Achievements}}
\\resumeItemListStart
${resumeData.achievements.map(achievement => `
\\item ${achievement.achievement}
`).join('')}
\\resumeItemListEnd

% ExtraCurricular
\\section{\\textbf{Extra Curricular}}
\\resumeItemListStart
${resumeData.extraCurricular.map(activity => `
\\item ${activity.activity}
`).join('')}
\\resumeItemListEnd

\\end{document}`;

  return latex;
}