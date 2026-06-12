import React, { useState } from 'react';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Download,
  FileText,
  BookOpen,
  Printer,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function OfflineDocument() {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const element = document.getElementById('document-content');
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Question_Bank_Mobile_WebAPI.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header - Don't print */}
      <div className="bg-white border-b border-slate-200 print:hidden sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a 
                href={createPageUrl('Home')}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </a>
              <div className="h-6 w-px bg-slate-200" />
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold text-slate-900">Offline Document</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="gap-2"
              >
                <Printer className="w-4 h-4" />
                Print
              </Button>
              <Button
                onClick={handleDownloadPDF}
                disabled={downloading}
                size="sm"
                className="gap-2 bg-indigo-600 hover:bg-indigo-700"
              >
                <Download className="w-4 h-4" />
                {downloading ? 'Generating...' : 'Download PDF'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div id="document-content" className="bg-white rounded-lg shadow-lg border border-slate-200 p-8 md:p-12 print:shadow-none print:border-0">
          {/* Title Page */}
          <div className="text-center mb-12 pb-12 border-b-2 border-slate-200">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 text-sm mb-6">
                <BookOpen className="w-4 h-4" />
                <span>Elsewedy IATS</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Question Bank
              </h1>
              <p className="text-xl text-slate-600">
                Mobile Applications & Web APIs
              </p>
            </motion.div>
          </div>

          {/* Mobile Applications Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                <span className="text-violet-600 font-bold">M</span>
              </div>
              Mobile Applications
            </h2>

            {/* True/False Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">1. True or False</h3>
              <div className="space-y-3">
                {[
                  { num: 1, q: "Cross-platform development frameworks allow developers to write code once and deploy it on multiple platforms, such as iOS and Android.", a: "True" },
                  { num: 2, q: "Flutter's hot reload feature requires a complete app restart.", a: "False" },
                  { num: 3, q: "Flutter can be used to develop applications for both Android and iOS.", a: "True" },
                  { num: 4, q: "The build() method in StateFull widget is called only once when the app starts.", a: "False" },
                  { num: 5, q: "The Column widget arranges its children in a horizontal layout.", a: "False" },
                  { num: 6, q: "The pubspec.yaml file in a Flutter project is used to manage dependencies.", a: "True" },
                  { num: 8, q: "GridView.builder in Flutter that allows creating a grid with a fixed number of items.", a: "False" },
                  { num: 9, q: "To access data from a provider, you must always use the Consumer widget only in Flutter.", a: "False" },
                  { num: 10, q: "Using Provider.of<T>(context, listen: false) will rebuild the UI whenever the provider's state changes.", a: "False" },
                  { num: 20, q: "IntelliJ allows you to push your commits to a remote repository using the Push button or git push in the terminal.", a: "True" },
                  { num: 41, q: "The NetworkImage class can be used directly in an Image widget to load images from the internet.", a: "True" },
                  { num: 42, q: "The AssetImage widget is used to load images from the internet.", a: "False" },
                  { num: 43, q: "A TextField in Flutter can only be used with a TextEditingController.", a: "False" },
                  { num: 44, q: "The validator property in a TextField is used to provide custom validation logic.", a: "True" },
                  { num: 45, q: "A FloatingActionButton must always have an onPressed callback to function correctly.", a: "True" },
                  { num: 46, q: "The child property in FloatingActionButton is used for the button to display content.", a: "True" },
                  { num: 47, q: "Using async and await in Dart allows asynchronous code to be written in a way that looks synchronous.", a: "True" },
                  { num: 48, q: "The Dio package supports both GET and POST HTTP methods for API requests.", a: "True" },
                  { num: 49, q: "If you do not use await with a Dio GET request, the response will still return synchronously.", a: "False" },
                  { num: 50, q: "The TextEditingController in a TextField is used to control and retrieve the entered text.", a: "True" },
                ].map((item) => (
                  <div key={item.num} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex gap-3">
                      <span className="font-semibold text-slate-600 min-w-[2rem]">{item.num}.</span>
                      <div className="flex-1">
                        <p className="text-slate-700 mb-1">{item.q}</p>
                        <p className="text-sm font-semibold text-indigo-600">Answer: {item.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Multiple Choice Section */}
            <div className="mb-8 page-break-before">
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">2. Choose the Correct Answer</h3>
              <div className="space-y-3">
                {[
                  { num: 51, q: "The widget that represents a circular button for triggering primary actions in an application.", choices: ["a) Elevated Button", "b) text button", "c) Floating Action Button", "d) Material Button"], a: "c) Floating Action Button" },
                  { num: 52, q: "The widget that Presents a scrollable list of widgets, ideal for displaying lists of items.", choices: ["a) ListView", "b) Container", "c) Column", "d) StateFull"], a: "a) ListView" },
                  { num: 53, q: "What is the purpose of the build() method in a Flutter widget?", choices: ["a) To initialize variables", "b) To handle API calls", "c) To describe the widget's UI structure", "d) To navigate between screens"], a: "c) To describe the widget's UI structure" },
                  { num: 54, q: "Which widget is used to manage the navigation and routing in a Flutter app?", choices: ["a) Column", "b) Navigator", "c) Drawer", "d) TabBar"], a: "b) Navigator" },
                  { num: 55, q: "Which widget is typically used to arrange widgets vertically in Flutter?", choices: ["a) Row", "b) Stack", "c) Column", "d) Expanded"], a: "c) Column" },
                ].map((item) => (
                  <div key={item.num} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex gap-3">
                      <span className="font-semibold text-slate-600 min-w-[2rem]">{item.num}.</span>
                      <div className="flex-1">
                        <p className="text-slate-700 mb-2">{item.q}</p>
                        <div className="pl-4 mb-2 space-y-1">
                          {item.choices.map((choice, idx) => (
                            <p key={idx} className="text-sm text-slate-600">{choice}</p>
                          ))}
                        </div>
                        <p className="text-sm font-semibold text-indigo-600">Answer: {item.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Web API Section */}
          <section className="mb-12 page-break-before">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <span className="text-emerald-600 font-bold">W</span>
              </div>
              ASP.NET Web API
            </h2>

            {/* True/False Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">True or False</h3>
              <div className="space-y-3">
                {[
                  { num: 1, q: "Asynchronous operations improve scalability in Web API.", a: "True" },
                  { num: 2, q: "RESTful APIs require maintaining client sessions on the server.", a: "False" },
                  { num: 3, q: "Singleton lifetime provides a single instance used throughout the application.", a: "True" },
                  { num: 4, q: "Stateless APIs store user data across requests.", a: "False" },
                  { num: 5, q: "Lazy loading loads related data only when explicitly accessed.", a: "True" },
                  { num: 6, q: "Dependency Injection simplifies testing and enhances code maintainability.", a: "True" },
                  { num: 7, q: "HTTPS ensures both data encryption and integrity.", a: "True" },
                  { num: 8, q: "Middleware components execute in the order they are added in the pipeline.", a: "True" },
                  { num: 9, q: "Indexing always improves performance without any trade-offs.", a: "False" },
                  { num: 10, q: "Tokens in stateless authentication are stored on the server.", a: "False" },
                ].map((item) => (
                  <div key={item.num} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex gap-3">
                      <span className="font-semibold text-slate-600 min-w-[2rem]">{item.num}.</span>
                      <div className="flex-1">
                        <p className="text-slate-700 mb-1">{item.q}</p>
                        <p className="text-sm font-semibold text-emerald-600">Answer: {item.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t-2 border-slate-200 text-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} Elsewedy IATS - Question Bank</p>
            <p className="mt-1">Mobile Applications & Web APIs</p>
          </div>
        </div>

        {/* Source Link - Don't print */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 print:hidden">
          <div className="flex items-start gap-3">
            <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Original Document</h4>
              <p className="text-sm text-blue-700 mb-2">
                This is an offline version of the Google Docs document. You can view the original document online:
              </p>
              <a 
                href="https://docs.google.com/document/d/1FloUkl_PIXOj74g0C9CleY7LBKJiSMbd/edit?usp=sharing&ouid=116159156101416327855&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Open in Google Docs →
              </a>
            </div>
          </div>
        </div>

        {/* Watermark */}
        <div className="mt-6 text-center text-slate-400 text-sm pb-4 print:hidden">
          Made by Mina Magdy
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white !important;
          }
          .page-break-before {
            page-break-before: always;
          }
          @page {
            margin: 2cm;
          }
        }
      `}</style>
    </div>
  );
}