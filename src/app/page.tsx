import { InteractiveTimeline } from "@/components/InteractiveTimeline";
import { ElectionWizard } from "@/components/ElectionWizard";
import { PollingLocator } from "@/components/PollingLocator";
import { CalendarIntegration } from "@/components/CalendarIntegration";
import { InteractiveQuiz } from "@/components/InteractiveQuiz";

export const metadata = {
  title: "Election Assistant | Your Guide to Voting",
  description: "Interactive platform to help you understand the election process, register to vote, and find your polling place.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground py-12 px-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Election Assistant</h1>
            <p className="mt-2 text-primary-foreground/80 text-lg">Your comprehensive guide to the 2024 Elections.</p>
          </div>
          <CalendarIntegration />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-24">
        
        <section aria-labelledby="wizard-heading">
          <h2 id="wizard-heading" className="text-3xl font-bold text-center mb-8">How to Vote</h2>
          <ElectionWizard />
        </section>

        <section aria-labelledby="timeline-heading" className="bg-muted/30 p-8 rounded-2xl border border-muted">
          <h2 id="timeline-heading" className="text-3xl font-bold mb-8">Key Election Dates</h2>
          <div className="max-w-3xl mx-auto">
            <InteractiveTimeline />
          </div>
        </section>

        <section aria-labelledby="locator-heading">
          <h2 id="locator-heading" className="text-3xl font-bold text-center mb-8">Find Your Polling Place</h2>
          <div className="max-w-4xl mx-auto">
            <PollingLocator />
          </div>
        </section>

        <section aria-labelledby="quiz-heading">
          <h2 id="quiz-heading" className="text-3xl font-bold text-center mb-8">Check Your Knowledge</h2>
          <InteractiveQuiz />
        </section>

      </div>
      
      <footer className="bg-muted py-8 text-center text-muted-foreground border-t">
        <p>© 2024 Election Assistant. A Civic Technology Initiative.</p>
      </footer>
    </main>
  );
}
