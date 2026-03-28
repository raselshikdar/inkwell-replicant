const PopularHeader = () => {
  return (
    <div className="flex items-start justify-between mb-5">
      <h1 className="text-xl font-bold text-foreground leading-tight">
        Popular<br />posts
      </h1>
      <div className="flex items-center gap-3 text-sm">
        <span className="text-muted-foreground">Last 24h:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-hn-green" />
          <span className="text-foreground font-semibold">712 articles</span>
        </div>
        <span className="text-muted-foreground">323 writers</span>
      </div>
    </div>
  );
};

export default PopularHeader;
