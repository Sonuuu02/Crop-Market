import { useAppSelector } from "../../../Redux Toolkit/Store";
import HomeCategoryTable from "./HomeCategoryTable";

function SeedTable() {
  const { homePage} = useAppSelector((store) => store);

  return (
    <>
      <HomeCategoryTable categories={homePage.homePageData?.seedCategories}/>
    </>
  );
}


export default SeedTable