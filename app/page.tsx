
async function getStrapiData(patch:string) {
  const baseUrl = "http://localhost:1337";
  try{
    const response = await fetch(baseUrl + patch);
    const data = await response.json();
    return data;
  } catch(error){
    console.error(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  const {title, description} = strapiData.data;
  return (
    <main className="container mx-auto py-6">
      <h1 className="text-3xl font-bold underline">{title}</h1>
      <p className="text-xl mt-4">{description}</p>
    </main>
  );
}
