"use client";

import { useState, useEffect } from "react";
import { ResumeData } from "../../types/index";
import ResumeView from "@/components/resume/ResumeView";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Download, FileText, ExternalLink, Edit } from "lucide-react";
import { generateLatexFile } from "@/lib/latex-generator";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [urls, setUrls] = useState<{ texUrl: string; overleafUrl: string } | null>(null);

  const handleGenerateLatex = async () => {
    if (!resumeData) return;
    setIsGenerating(true);
    try {
      const texContent = generateLatexFile(resumeData);
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texContent }),
      });

      const { texUrl } = await response.json();
      const overleafUrl = `https://www.overleaf.com/docs?snip_uri=${texUrl}`;
      console.log('Resume files generated:', { texUrl, overleafUrl });
      setUrls({ texUrl, overleafUrl });
    } catch (error) {
      console.error('Error generating files:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await fetch('/api/resume', {
          method: 'GET',
        });
        const data = await response.json();
        console.log('Resume data fetched successfully:', data);
        setResumeData(data);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      } 
    };
    fetchResumeData();
  }, []);

  const handleDownloadTex = () => {
    if (urls?.texUrl) {
      window.open(urls.texUrl, '_blank');
    }
  };

  const handleOpenOverleaf = () => {
    if (urls?.overleafUrl) {
      window.open(urls.overleafUrl, '_blank');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-end mb-4">
          <Button onClick={() => router.push('/editResume')}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Resume
          </Button>
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Resume Builder
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Your Resume
          </h2>
          {resumeData ? <ResumeView resumeData={resumeData} /> : <Loading />}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {!urls ? (
            <Button
              onClick={handleGenerateLatex}
              className="w-64"
              disabled={isGenerating || !resumeData}
            >
              <Download className="w-4 h-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate Resume Files"}
            </Button>
          ) : (
            <>
              <Button
                onClick={handleDownloadTex}
                className="w-64"
                variant="secondary"
              >
                <Download className="w-4 h-4 mr-2" />
                Download TEX File
              </Button>
              <Button
                onClick={handleOpenOverleaf}
                className="w-64"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in Overleaf
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}