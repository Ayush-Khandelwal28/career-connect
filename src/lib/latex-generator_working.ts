import { ResumeData } from "../types/index";

export function generateLatexFile(resumeData: ResumeData): string {
  const latex = `
  % \\documentclass[a4paper,12pt]{article}

\\documentclass[10.7pt]{article} % Set the font size to 10pt
\\usepackage[a4paper, top=0.05in, bottom=0.05in, left=0.5in, right=0.5in]% Adjust the page margins to 0.5 inches on all sides
% \\usepackage[a4paper, top=0.1in, bottom=0.1in, left=0.2in, right=0.2in]{geometry}


%----------------------------------------------------------------------------------------
%	FONT
%----------------------------------------------------------------------------------------

% % fontspec allows you to use TTF/OTF fonts directly
% \\usepackage{fontspec}
% \\defaultfontfeatures{Ligatures=TeX}

% % modified for ShareLaTeX use
% \\setmainfont[
% SmallCapsFont = Fontin-SmallCaps.otf,
% BoldFont = Fontin-Bold.otf,
% ItalicFont = Fontin-Italic.otf
% ]
% {Fontin.otf}

%----------------------------------------------------------------------------------------
%	PACKAGES
%----------------------------------------------------------------------------------------
\\usepackage{url}
\\usepackage{parskip} 
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[pdftex]{hyperref}
\\usepackage{fancyhdr}
\\usepackage{anyfontsize}

%other packages for formatting
\\RequirePackage{color}
\\RequirePackage{graphicx}
\\usepackage[usenames,dvipsnames]{xcolor}
\\usepackage[scale=0.9]{geometry}

%tabularx environment
\\usepackage{tabularx}

% Custom commands
\\newcommand{\\resumeItem}[2]{
  \\item\\small{
    \\textbf{#1}{: #2 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeItemWithoutTitle}[1]{
  \\item\\small{
    {\\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-0.5pt}\\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{#3} & \\textit{#4} \\\\
    \\end{tabular*}\\vspace{-5pt}
}

\\newcommand{\\resumeSubItem}[2]{\\resumeItem{#1}{#2}\\vspace{-3pt}}

\\renewcommand{\\labelitemii}{$\\circ$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=*]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%for lists within experience section
\\usepackage{enumitem}

% centered version of 'X' col. type
\\newcolumntype{C}{>{\\centering\\arraybackslash}X} 

%to prevent spillover of tabular into next pages
\\usepackage{supertabular}
\\usepackage{tabularx}
\\newlength{\\fullcollw}
\\setlength{\\fullcollw}{0.47\\textwidth}

%custom \\section
\\usepackage{titlesec}				
\\usepackage{multicol}
\\usepackage{multirow}

%CV Sections inspired by: 
%http://stefano.italians.nl/archives/26
\\titleformat{\\section}{\\Large\\scshape\\raggedright}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{10pt}{10pt}
% \\titlespacing*{\\subsection}{0pt}{4pt}{4pt}

%for publications
\\usepackage[style=authoryear,sorting=ynt, maxbibnames=2]{biblatex}

%Setup hyperref package, and colours for links
\\usepackage[unicode, draft=false]{hyperref}
\\definecolor{linkcolour}{rgb}{0,0.2,0.6}
\\hypersetup{colorlinks,breaklinks,urlcolor=linkcolour,linkcolor=linkcolour}
\\addbibresource{citations.bib}
\\setlength\\bibitemsep{1em}

%for social icons
\\usepackage{fontawesome5}

%debug page outer frames
%\\usepackage{showframe}

%----------------------------------------------------------------------------------------
%	BEGIN DOCUMENT
%----------------------------------------------------------------------------------------
\\begin{document}

% non-numbered pages
\\pagestyle{empty} 

%----------------------------------------------------------------------------------------
%	TITLE
%----------------------------------------------------------------------------------------

% \\begin{tabularx}{\\linewidth}{ @{}X X@{} }
% \\huge{Your Name}\\vspace{2pt} & \\hfill \\emoji{incoming-envelope} email@email.com \\\\
% \\raisebox{-0.05\\height}\\faGithub\\ username \\ | \\
% \\raisebox{-0.00\\height}\\faLinkedin\\ username \\ | \\ \\raisebox{-0.05\\height}\\faGlobe \\ mysite.com  & \\hfill \\emoji{calling} number
% \\end{tabularx}

\\begin{tabularx}{\\linewidth}{@{} C @{}}
\\Huge{Ayush Khandelwal} \\\\[7.5pt]
\\href{https://github.com/Ayush-Khandelwal28}{\\raisebox{-0.05\\height}\\faGithub\\ Ayush-Khandelwal28} \\ $|$ \\ 
\\href{https://linkedin.com/in/ayushkhandelwal28}{\\raisebox{-0.05\\height}\\faLinkedin\\ ayushkhandelwal28}   \\ $|$ \\ 
\\href{mailto:ayushkh35@gmail.com}{\\raisebox{-0.05\\height}\\faEnvelope \\ ayushkh35@gmail.com} \\ $|$ \\ 
\\href{tel:+000000000000}{\\raisebox{-0.05\\height}\\faMobile \\ +91 9827893637} \\\\
\\end{tabularx}

%----------------------------------------------------------------------------------------
%	EDUCATION
%----------------------------------------------------------------------------------------
%-----------EDUCATION-----------------
\\section{Education}
\\resumeSubHeadingListStart
${resumeData.education.map(edu => `
  \\resumeSubheading
    {${edu.collegeName}}
    {${'Gandhinagar, India'}}
    {${edu.degreeName} ${edu.courseName} - ${edu.currentGPA || ''}}
    {${edu.courseStartYear} - ${edu.courseEndYear}}
`).join('')}
\\resumeSubHeadingListEnd

\\end{document}
`;

  return latex;
}
