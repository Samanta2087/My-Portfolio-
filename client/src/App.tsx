import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Spotlight } from "@/components/ui/Spotlight";
import NotFound from "@/pages/not-found";
import { lazy, Suspense } from "react";

// Lazy load pages
const Home = lazy(() => import("@/pages/Home"));
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const ProjectsManagement = lazy(() => import("@/pages/admin/ProjectsManagement"));
const MessagesManagement = lazy(() => import("@/pages/admin/MessagesManagement"));
const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const Settings = lazy(() => import("@/pages/admin/Settings"));
const AdminLayout = lazy(() => import("@/components/admin/AdminLayout"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
  </div>
);

function Router() {
  return (
    <Switch>
      <Route path="/">
        {() => (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        )}
      </Route>
      
      <Route path="/Jeet/login">
        {() => (
          <Suspense fallback={<PageLoader />}>
            <AdminLogin />
          </Suspense>
        )}
      </Route>

      <Route path="/Jeet">
        {() => (
          <Suspense fallback={<PageLoader />}>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </Suspense>
        )}
      </Route>

      <Route path="/Jeet/projects">
        {() => (
          <Suspense fallback={<PageLoader />}>
            <AdminLayout>
              <ProjectsManagement />
            </AdminLayout>
          </Suspense>
        )}
      </Route>

      <Route path="/Jeet/messages">
        {() => (
          <Suspense fallback={<PageLoader />}>
            <AdminLayout>
              <MessagesManagement />
            </AdminLayout>
          </Suspense>
        )}
      </Route>

      <Route path="/Jeet/analytics">
        {() => (
          <Suspense fallback={<PageLoader />}>
            <AdminLayout>
              <Analytics />
            </AdminLayout>
          </Suspense>
        )}
      </Route>

      <Route path="/Jeet/settings">
        {() => (
          <Suspense fallback={<PageLoader />}>
            <AdminLayout>
              <Settings />
            </AdminLayout>
          </Suspense>
        )}
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Spotlight />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
