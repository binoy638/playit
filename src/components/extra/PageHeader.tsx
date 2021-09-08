const PageHeader = ({ heading }: { heading: string }) => {
  return (
    <div className="page-header">
      <h1>{heading}</h1>
    </div>
  );
};

export default PageHeader;
