
import Header from "./_Component/Header.jsx";
import MatchCard from "./_Component/MatchCard.jsx";
import  PaginateDemo  from "./_Component/PaginationDemo.jsx";

export default async function Home() {
  const res = await fetch("http://localhost:2833/data")
  const  data  = await res.json();
console.log("✅ API returned data:", data);

  return (
    <>
      <Header />
      <main className=" p-8" >
        <h1 className=" text-4xl text-center font-extrabold text-[royalBlue] w-full">FootBall Season 2025-26</h1>
        <div className="pt-16 px-4 flex flex-col gap-4">
          {data?.map((item, i) => {
            return <MatchCard item={item} key={i} />
          })}
          
        </div>
        <PaginateDemo />
      </main>
    </>
  );
}
