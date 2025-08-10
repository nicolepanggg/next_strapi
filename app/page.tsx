import qs from 'qs';

const homePageQuery = qs.stringify({
      populate: {
        blocks: {
          populate: '*',
        },
      },
})

async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  console.log(url.href);

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    // console.log(data);
    console.dir(data, { depth: null });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  try {
    const homePageApiData = await getStrapiData("/api/home-page");
    if (!homePageApiData?.data) {
      return <div>Error: No data found</div>;
    }
    const { title, description } = homePageApiData.data;

    return (
      <main className="container mx-auto py-6">
        <h1 className="text-3xl font-bold underline">{title}</h1>
        <p className="text-xl mt-4">{description}</p>
      </main>
    );
  } catch (error) {
    return <div>Error: Failed to load data from Strapi</div>;
  }
}