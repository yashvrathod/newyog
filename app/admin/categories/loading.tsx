export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 bg-muted rounded w-32 mb-2 animate-pulse" />
          <div className="h-4 bg-muted rounded w-64 animate-pulse" />
        </div>
        <div className="h-10 bg-muted rounded w-32 animate-pulse" />
      </div>

      {/* Search */}
      <div className="h-10 bg-muted rounded w-72 animate-pulse" />

      {/* Table */}
      <div className="border rounded-lg">
        <div className="p-4 border-b">
          <div className="flex gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-4 bg-muted rounded w-20 animate-pulse" />
            ))}
          </div>
        </div>
        <div className="space-y-4 p-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex gap-4 items-center">
              {Array.from({ length: 6 }).map((_, cellIndex) => (
                <div 
                  key={cellIndex} 
                  className={`h-4 bg-muted rounded animate-pulse ${
                    cellIndex === 0 ? 'w-32' : 
                    cellIndex === 1 ? 'w-24' : 
                    cellIndex === 2 ? 'w-16' : 
                    cellIndex === 3 ? 'w-20' : 
                    cellIndex === 4 ? 'w-16' : 'w-8'
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}