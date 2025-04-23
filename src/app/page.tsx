"use client";
import dynamic from "next/dynamic";
import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useGlobalStore } from "@/store/global";
import { useSettingStore } from "@/store/setting";
import MovieList from "@/components/Research/MovieList";
import Layout from "@/components/layout/Layout";

const DirectResearch = dynamic(() => import("@/components/Research/DirectResearch"));
const Header = dynamic(() => import("@/components/Header"));
const Setting = dynamic(() => import("@/components/Setting"));
const Topic = dynamic(() => import("@/components/Research/Topic"));
const Feedback = dynamic(() => import("@/components/Research/Feedback"));
const ResearchFlow = dynamic(() => import("@/components/Research/ResearchFlow"));
const SearchResult = dynamic(
  () => import("@/components/Research/SearchResult")
);
const FinalReport = dynamic(() => import("@/components/Research/FinalReport"));
const History = dynamic(() => import("@/components/History"));

function Home() {
  const { t } = useTranslation();
  const globalStore = useGlobalStore();

  const { theme } = useSettingStore();
  const { setTheme } = useTheme();

  useLayoutEffect(() => {
    const settingStore = useSettingStore.getState();
    setTheme(settingStore.theme);
  }, [theme, setTheme]);
  return (
    <Layout>
    <div className="max-w-screen-md mx-auto px-4">
      {/* <Header /> */}
      <main>
        <ResearchFlow />
        {/* <DirectResearch />
        <Topic />
        <Feedback />
        <SearchResult />
        <FinalReport /> */}
        {/* <MovieList /> */}
      </main>
     
      <aside className="print:hidden">
        <Setting
          open={globalStore.openSetting}
          onClose={() => globalStore.setOpenSetting(false)}
        />
        <History
          open={globalStore.openHistory}
          onClose={() => globalStore.setOpenHistory(false)}
        />
      </aside>
    </div>
    </Layout>
  );
}

export default Home;
