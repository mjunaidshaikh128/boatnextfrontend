const page = ({ params }: { params: { boatid: string } }) => {
  return <div>My Post: {params.boatid}</div>;
};

export default page;
