import { useQuery } from "@tanstack/react-query";
import Header from "@/components/admin/Header";
import { BarChart3, Eye, TrendingUp, Calendar } from "lucide-react";

interface PageView {
  path: string;
  views: number;
}

export default function Analytics() {
  const { data: pageViews, isLoading } = useQuery<PageView[]>({
    queryKey: ["/api/admin/analytics"],
  });

  const totalViews = pageViews?.reduce((sum, page) => sum + page.views, 0) || 0;

  return (
    <div className="flex-1 overflow-auto">
      <Header
        title="Analytics"
        description="Track your portfolio performance"
      />

      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-secondary/50 backdrop-blur-sm border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Eye className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Views</p>
              <h3 className="text-3xl font-bold">{totalViews}</h3>
              <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
            </div>
          </div>

          <div className="bg-secondary/50 backdrop-blur-sm border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Unique Pages</p>
              <h3 className="text-3xl font-bold">{pageViews?.length || 0}</h3>
              <p className="text-xs text-muted-foreground mt-2">Pages tracked</p>
            </div>
          </div>

          <div className="bg-secondary/50 backdrop-blur-sm border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg. Views/Page</p>
              <h3 className="text-3xl font-bold">
                {pageViews?.length ? Math.round(totalViews / pageViews.length) : 0}
              </h3>
              <p className="text-xs text-muted-foreground mt-2">Per page</p>
            </div>
          </div>
        </div>

        {/* Page Views Table */}
        <div className="bg-secondary/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Page Views (Last 30 Days)</h2>
            </div>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-sm text-muted-foreground mt-4">Loading analytics...</p>
            </div>
          ) : pageViews && pageViews.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/80">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-muted-foreground">
                      Page Path
                    </th>
                    <th className="text-right p-4 text-sm font-semibold text-muted-foreground">
                      Views
                    </th>
                    <th className="text-right p-4 text-sm font-semibold text-muted-foreground">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {pageViews.map((page, index) => {
                    const percentage = ((page.views / totalViews) * 100).toFixed(1);
                    return (
                      <tr
                        key={index}
                        className="hover:bg-secondary/30 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono text-primary">
                              {page.path || "/"}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-semibold">
                              {page.views}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-24 bg-secondary rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-primary h-full rounded-full transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-12">
                              {percentage}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No analytics data yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Page views will appear here once visitors browse your portfolio
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
