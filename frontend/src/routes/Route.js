import { Suspense, lazy } from "react";
import { Navigate, Routes, useRoutes } from "react-router-dom";

// config

// without lazy Loading
import LoadingScreen from "../Components/LoadingScreen";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import HomeLayout from "../layouts/Home/HomeLayout";
// import Selectionlayout from "../layouts/TestSelection/SelectionLayout";
// import ModulesLayout from "../layouts/Modules/ModulesLayout";
import SectionLayout from "../layouts/Modules/SectionLayout";
import AdminSectionLayout from "../layouts/Modules/AdminSectionLayout";
import PracticeLayout from "../layouts/PracticeLayout/PracticeLayout";
import ProfileLayout from "../layouts/Home/ProfileLayout";
import SignUpPage from "../Pages/Auth/SignUpPage";
import Login from "../Pages/Auth/SignIn";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import AccountActivationPage from "../Pages/Auth/AccountActivationPage";
import PasswordResetConfirm from "../Pages/Auth/PasswordResetConfirm";
import { ProtectedRoute } from "./ProtectedRoute";
import ContentLayout from "../layouts/Home/ContentLayout";
import Page404 from "../Pages/ErrorPage/Page404";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen></LoadingScreen>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout></AuthLayout>,
      children: [
        { path: "signup", element: <SignUpPage></SignUpPage> },
        { path: "signin", element: <Login></Login> },
        { path: "forgotpass", element: <ForgotPassword></ForgotPassword> },
        {
          path: "activation/:actoken",
          element: <AccountActivationPage></AccountActivationPage>,
        },
        {
          path: "pass-reset/:passtoken",
          element: <PasswordResetConfirm></PasswordResetConfirm>,
        },

        { path: "404", element: <Page404></Page404> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/*",
      element: <ProfileLayout></ProfileLayout>,
      children: [
        { path: "404", element: <Page404></Page404> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <ProfileLayout></ProfileLayout>
        </ProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <Dashboard></Dashboard> },
        { path: "404", element: <Page404></Page404> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/",
      element: <HomeLayout></HomeLayout>,
      children: [{ path: "", element: <HomePage></HomePage> }],
    },
    {
      path: "/",
      element: <ContentLayout></ContentLayout>,
      children: [
        { path: "materials", element: <Duolingo></Duolingo> },
        { path: "community", element: <CommunityIndex></CommunityIndex> },
        { path: "articals", element: <Articals></Articals> },
      
      ],
    },
    {
      path: "/duolingo",
      element: <ContentLayout></ContentLayout>,
      children: [
        { path: "reading", element: <OverViewPage id={1}></OverViewPage> },
        { path: "writing", element: <OverViewPage id={2}></OverViewPage> },
        { path: "speaking", element: <OverViewPage id={3}></OverViewPage> },
        { path: "listening", element: <OverViewPage id={4}></OverViewPage> },
        {
          path: "tips/reading",
          element: <GuideLineReading></GuideLineReading>,
        },
        {
          path: "tips/speaking",
          element: <GuideLineSpeaking></GuideLineSpeaking>,
        },
        {
          path: "tips/writing",
          element: <GuideLineWriting></GuideLineWriting>,
        },
        {
          path: "tips/listening",
          element: <GuideLineListening></GuideLineListening>,
        },
        { path: "404", element: <Page404></Page404> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },

    // {
    //   path: "/modules",
    //   element: <ModulesLayout></ModulesLayout>,
    //   // children: [{ path: "/test/listen-type", element: <ListenTypeSinglePage></ListenTypeSinglePage> }],
    // },

    {
      path: "/admin",
      element: <AdminSectionLayout></AdminSectionLayout>,
      children: [
        {
          path: "vocabulary",
          element: <AdminContainerPageVoc></AdminContainerPageVoc>,
        },
        { path: "vocabulary/create", element: <VocCreate></VocCreate> },
        { path: "edit/vrs-v", element: <VocEdit></VocEdit> },
        { path: "edit/rc-r", element: <EditRC></EditRC> },
        { path: "edit/rcs-r", element: <EditInteractiveReading></EditInteractiveReading> },
        // { path: "edit/rcp-r", element: <EditRCP></EditRCP> },
        // { path: "edit/rci-r", element: <EditRCI></EditRCI> },
        // { path: "edit/rgpt-r", element: <EditRGPT></EditRGPT> },
        // { path: "edit/rha-r", element: <EditRHA></EditRHA> },
        // {
        //   path: "reading",
        //   element: <AdminContainerPageReading></AdminContainerPageReading>,
        // },
         {
          path: "reading",
          element: <AdminContainerInteractiveReading></AdminContainerInteractiveReading>,
        },
        {
          path: "writing",
          element: <AdminContainerPageWriting></AdminContainerPageWriting>,
        },
        { path: "edit/wap-w", element: <EditWAP></EditWAP> },
        { path: "edit/rtw-w", element: <EditRTW></EditRTW> },
        { path: "edit/ws-w", element: <EditWS></EditWS> },
        {
          path: "speaking",
          element: <AdminContainerPageSpeaking></AdminContainerPageSpeaking>,
        },
        { path: "edit/sal-s", element: <EditSAL></EditSAL> },
        { path: "edit/sap-s", element: <EditSAP></EditSAP> },
        { path: "edit/srs-s", element: <EditSRS></EditSRS> },
        { path: "edit/sls-s", element: <EditSLS></EditSLS> },
        { path: "edit/ss-s", element: <EditSS></EditSS> },
        {
          path: "listening",
          element: <AdminContainerPageListening></AdminContainerPageListening>,
        },
        { path: "edit/llt-l", element: <EditLLT></EditLLT> },
        { path: "edit/llr-l", element: <EditLLR></EditLLR> },
        { path: "404", element: <Page404></Page404> },
        { path: "*", element: <Navigate to="/404" replace /> },

        // { path: "vocabulary", element: <VocabularyModuleContainer></VocabularyModuleContainer> }
      ],
    },
    {
      path: "duolingo/module",
      element: (
        <ProtectedRoute>
          <SectionLayout></SectionLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "writing",
          element: <WritingModuleContainer></WritingModuleContainer>,
        },
        {
          path: "reading",
          element: <ReadingModuleContainer></ReadingModuleContainer>,
        },
        {
          path: "speaking",
          element: <SpeakingModuleContainer></SpeakingModuleContainer>,
        },
        {
          path: "listening",
          element: <ListeningModuleContainer></ListeningModuleContainer>,
        },
        {
          path: "vocabulary",
          element: <VocabularyModuleContainer></VocabularyModuleContainer>,
        },
        { path: "404", element: <Page404></Page404> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/practice",
      element: (
        <ProtectedRoute>
          <PracticeLayout></PracticeLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "wap-w/:rid",
          element: [
            <PracticePageWAP></PracticePageWAP>,
            // <SectionAddition></SectionAddition>,
          ],
        },
        {
          path: "rtw-w/:rid",
          element: [
            <PracticePageRTW></PracticePageRTW>,
            // <SectionAddition></SectionAddition>,
          ],
        },
        {
          path: "ws-w/:rid",
          element: [
            <PracticePageWS></PracticePageWS>,
            // <SectionAddition></SectionAddition>,
          ],
        },
        {
          path: "rc-r/:rid",
          element: [
            <PracticePageRC></PracticePageRC>,
            <SectionAddition></SectionAddition>,
          ],
        },
        {
          path: "rcs-r/:rid",
          element: [
            <PracticePageRCS></PracticePageRCS>,
            <SectionAddition></SectionAddition>,
          ],
        },
        {
          path: "rcp-r/:rid",
          element: [
            <PracticePageRCP></PracticePageRCP>,
            <SectionAddition></SectionAddition>,
          ],
        },
        {
          path: "rci-r/:rid",
          element: [
            <PracticePageRCI></PracticePageRCI>,
            <SectionAddition></SectionAddition>,
          ],
        },
        {
          path: "rha-r/:rid",
          element: [
            <PracticePageRHA></PracticePageRHA>,
            <SectionAddition></SectionAddition>,
          ],
        },
        {
          path: "rgpt-r/:rid",
          element: [
            <PracticePageRGP></PracticePageRGP>,
            <SectionAddition></SectionAddition>,
          ],
        },
        {
          path: "sal-s/:rid",
          element: [
            <PracticePageSAL></PracticePageSAL>,
            <SectionAddition></SectionAddition>,
          ],
        },
        {
          path: "sap-s/:rid",
          element: [
            <PracticePageSAP></PracticePageSAP>,
            <SectionAddition></SectionAddition>,
          ],
        },
        {
          path: "srs-s/:rid",
          element: [
            <PracticePageSRS></PracticePageSRS>,
            <SectionAddition></SectionAddition>,
          ],
        },
        {
          path: "sls-s/:rid",
          element: [
            <PracticePageSLS></PracticePageSLS>,
            <SectionAddition></SectionAddition>,
          ],
        },
        {
          path: "ss-s/:rid",
          element: [
            <PracticePageSS></PracticePageSS>,
            // <SectionAddition></SectionAddition>,
          ],
        },
        {
          path: "llt-l/:rid",
          element: [
            <PracticePageLLT></PracticePageLLT>,
            <SectionAddition></SectionAddition>,
          ],
        },
        {
          path: "llr-l/:rid",
          element: [
            <PracticePageLLR></PracticePageLLR>,
            <SectionAddition></SectionAddition>,
          ],
        },

        {
          path: "vrs-v/:rid",
          element: [
            <PracticePageVRS></PracticePageVRS>,
            <SectionAddition></SectionAddition>,
          ],
        },
        { path: "404", element: <Page404></Page404> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}

// the pages that will show under the hood of Lazy Loading...
const HomePage = Loadable(lazy(() => import("../Pages/Home/HomePage")));
// Module Overview  pAGES
const OverViewPage = Loadable(
  lazy(() => import("../Pages/ModuleOverView/Duolingo/OverViewPage"))
);

const WritingModuleContainer = Loadable(
  lazy(() => import("../Pages/ModuleContainer/WritingModuleContainer"))
);
const ReadingModuleContainer = Loadable(
  lazy(() => import("../Pages/ModuleContainer/ReadingModuleContainer"))
);
const SpeakingModuleContainer = Loadable(
  lazy(() => import("../Pages/ModuleContainer/SpeakingModuleContainer"))
);
const ListeningModuleContainer = Loadable(
  lazy(() => import("../Pages/ModuleContainer/ListeningModuleContainer"))
);
const VocabularyModuleContainer = Loadable(
  lazy(() => import("../Pages/ModuleContainer/VocabularyModuleContainer"))
);

//admin
const AdminContainerPageVoc = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageVoc/AdminContainerPageVoc"))
);
const VocCreate = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageVoc/VocCreate"))
);
const VocEdit = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageVoc/VocEdit"))
);
const AdminContainerPageReading = Loadable(
  lazy(() =>
    import("../Pages/Admin/ContainerPageReading/AdminContainerPageReading")
  )
);
//
const AdminContainerInteractiveReading = Loadable(
  lazy(() =>
    import("../Pages/Admin/ContainerPageReading/AdminContainerInteractiveReading")
  )
);
//
const EditRC = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageReading/EditRC"))
);
const EditRCS = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageReading/EditRCS"))
);
const EditInteractiveReading = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageReading/EditInteractiveReading"))
);
const EditRCP = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageReading/EditRCP"))
);
const EditRCI = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageReading/EditRCI"))
);
const EditRGPT = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageReading/EditRGPT"))
);
const EditRHA = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageReading/EditRHA"))
);

const AdminContainerPageWriting = Loadable(
  lazy(() =>
    import("../Pages/Admin/ContainerPageWriting/AdminContainerPageWriting")
  )
);
const EditWAP = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageWriting/EditWAP"))
);
const EditRTW = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageWriting/EditRTW"))
);
const EditWS = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageWriting/EditWS"))
);

const AdminContainerPageSpeaking = Loadable(
  lazy(() =>
    import("../Pages/Admin/ContainerPageSepaking/AdminContainerPageSpeaking")
  )
);
const EditSAL = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageSepaking/EditSAL"))
);
const EditSAP = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageSepaking/EditSAP"))
);
const EditSRS = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageSepaking/EditSRS"))
);
const EditSLS = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageSepaking/EditSLS"))
);
const EditSS = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageSepaking/EditSS"))
);
const AdminContainerPageListening = Loadable(
  lazy(() =>
    import("../Pages/Admin/ContainerPageListening/AdminContainerPageListening")
  )
);

const EditLLT = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageListening/EditLLT"))
);
const EditLLR = Loadable(
  lazy(() => import("../Pages/Admin/ContainerPageListening/EditLLR"))
);

const PracticePageWAP = Loadable(
  lazy(() => import("../Pages/PracticeWriting/PracticePageWAP"))
);
const PracticePageWS = Loadable(
  lazy(() => import("../Pages/PracticeWriting/PracticePageWS"))
);
const PracticePageRTW = Loadable(
  lazy(() => import("../Pages/PracticeWriting/PracticePageRTW"))
);
const SectionAddition = Loadable(
  lazy(() => import("../Pages/SectionAddition/SectionAddition"))
);
const PracticePageRC = Loadable(
  lazy(() => import("../Pages/PracticeReading/PracticePageRC"))
);
const PracticePageRCS = Loadable(
  lazy(() => import("../Pages/PracticeReading/PracticePageRCS"))
);
const PracticePageRCP = Loadable(
  lazy(() => import("../Pages/PracticeReading/PracticePageRCP"))
);
const PracticePageRHA = Loadable(
  lazy(() => import("../Pages/PracticeReading/PracticePageRHA"))
);
const PracticePageRCI = Loadable(
  lazy(() => import("../Pages/PracticeReading/PracticePageRCI"))
);
const PracticePageRGP = Loadable(
  lazy(() => import("../Pages/PracticeReading/PracticePageRGP"))
);
const PracticePageSAL = Loadable(
  lazy(() => import("../Pages/PracticeSpeaking/PracticePageSAL"))
);
const PracticePageSAP = Loadable(
  lazy(() => import("../Pages/PracticeSpeaking/PracticePageSAP"))
);
const PracticePageSRS = Loadable(
  lazy(() => import("../Pages/PracticeSpeaking/PracticePageSRS"))
);
const PracticePageSLS = Loadable(
  lazy(() => import("../Pages/PracticeSpeaking/PracticePageSLS"))
);
const PracticePageSS = Loadable(
  lazy(() => import("../Pages/PracticeSpeaking/PracticePageSS"))
);
const PracticePageLLT = Loadable(
  lazy(() => import("../Pages/PracticeListening/PracticePageLLT"))
);
const PracticePageLLR = Loadable(
  lazy(() => import("../Pages/PracticeListening/PracticePageLLR"))
);
const PracticePageVRS = Loadable(
  lazy(() => import("../Pages/PracticeVocabulary/PracticePageVRS"))
);

// modules

const Duolingo = Loadable(lazy(() => import("../Pages/Materials/Duolingo")));

// profile
const Dashboard = Loadable(lazy(() => import("../Pages/Profile/Dashboard")));

//Tips Duolingo
const GuideLineReading = Loadable(
  lazy(() => import("../Pages/ISNReading/GuideLineReading"))
);
const GuideLineSpeaking = Loadable(
  lazy(() => import("../Pages/ISNSpeaking/GuideLineSpeaking"))
);
const GuideLineWriting = Loadable(
  lazy(() => import("../Pages/ISNWriting/GuideLineWriting"))
);
const GuideLineListening = Loadable(
  lazy(() => import("../Pages/ISNListening/GuideLineListening"))
);

// Community

const CommunityIndex = Loadable(
  lazy(() => import("../Pages/Community/CommunityIndex"))
);
// Articals
const Articals = Loadable(lazy(() => import("../Pages/Articals/Articals")));
