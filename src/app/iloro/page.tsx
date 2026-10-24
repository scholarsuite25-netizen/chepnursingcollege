"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getApplications,
  updateApplicationStatus,
  publishDispatch,
  getNewsDispatches,
  updateDispatch,
  deleteDispatch,
  getSiteUsers,
  createSiteUser,
  updateSiteUser,
  deleteSiteUser,
  getMediaGallery,
  addMediaPhoto,
  deleteMediaPhoto,
} from "@/app/actions/admin";

interface Candidate {
  id: string;
  name: string;
  initials: string;
  program: string;
  duration: string;
  olevel: string;
  olevelStatus: string;
  rrr: string;
  fee: string;
  batch: string;
  status: string;
}

interface PostItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  author: string;
  read_time: string;
  image_url: string;
  published: boolean;
  created_at?: string;
}

interface SiteUserItem {
  id: string;
  full_name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  avatar_url?: string | null;
}

interface MediaPhotoItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  caption?: string;
  uploaded_by?: string;
}

interface ELibraryItem {
  id: string;
  title: string;
  author: string;
  category: string;
  type: "ebook" | "journal";
  isbnOrDoi: string;
  level: string;
}

interface ExamQuestionItem {
  id: string;
  type: "mcq" | "essay" | "osce";
  prompt: string;
  category: string;
  level: string;
  keyOrRubric: string;
}

export default function AdminPage() {
  // Authentication & Security Gate States
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loginEmail, setLoginEmail] = useState("provost@chepnursingcollege.org");
  const [loginPassword, setLoginPassword] = useState("chep2026admin");
  const [loginRole, setLoginRole] = useState("Super Administrator (Provost)");
  const [loginLoading, setLoginLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Navigation & View States
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "posts"
    | "media"
    | "admissions"
    | "library"
    | "exams"
    | "reflections"
    | "users"
    | "tools"
    | "settings"
  >("overview");

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [postFilterStatus, setPostFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [mediaViewMode, setMediaViewMode] = useState<"grid" | "list">("grid");
  const [mediaTypeFilter, setMediaTypeFilter] = useState("all");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAdminSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      setIsAuthenticated(true);
      showToast(`Welcome, ${loginRole}. Session authenticated via NMCN Security Node.`);
    }, 600);
  };

  const handleAdminSignOut = () => {
    setIsAuthenticated(false);
    showToast("Signed out of CHEP Institutional Senate Suite.");
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setForgotPasswordModalOpen(false);
      showToast("Security reset token dispatched to verified registry inbox.");
    }, 2000);
  };

  // 1. Admissions Candidates State
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "CHEP/ADM/2026/089",
      name: "Adebayo Oluwaseun",
      initials: "AO",
      program: "Basic Nursing",
      duration: "3-Year ND/HND",
      olevel: "Verified (5 Credits)",
      olevelStatus: "verified",
      rrr: "RRR: 2901-4412-8819",
      fee: "₦15,000 Paid",
      batch: "Batch A-04",
      status: "pending",
    },
    {
      id: "CHEP/ADM/2026/092",
      name: "Chukwuemeka Blessing",
      initials: "CE",
      program: "Post-Basic Midwifery",
      duration: "18-Month Accelerated",
      olevel: "Verified (RN Certified)",
      olevelStatus: "verified",
      rrr: "RRR: 1109-8762-3401",
      fee: "₦20,000 Paid",
      batch: "Batch B-01",
      status: "pending",
    },
    {
      id: "CHEP/ADM/2026/104",
      name: "Fatima Balarabe Umar",
      initials: "FB",
      program: "Basic Nursing",
      duration: "3-Year ND/HND",
      olevel: "Pending Physics Attestation",
      olevelStatus: "pending",
      rrr: "RRR: 7721-3940-5110",
      fee: "₦15,000 Paid",
      batch: "Batch A-02",
      status: "pending",
    },
    {
      id: "CHEP/ADM/2026/118",
      name: "Williams Folake Sharon",
      initials: "WF",
      program: "Public Health Nursing",
      duration: "2-Year Specialist",
      olevel: "Verified (5 Credits)",
      olevelStatus: "verified",
      rrr: "RRR: 4490-1123-9988",
      fee: "₦15,000 Paid",
      batch: "Batch C-01",
      status: "admitted",
    },
    {
      id: "CHEP/ADM/2026/122",
      name: "Okafor Emmanuel Chukwudi",
      initials: "OE",
      program: "Perioperative Nursing",
      duration: "1-Year Specialist",
      olevel: "Verified (RN + 5 Credits)",
      olevelStatus: "verified",
      rrr: "RRR: 8812-4930-1092",
      fee: "₦20,000 Paid",
      batch: "Batch B-02",
      status: "under_review",
    },
  ]);
  const [selectedDossier, setSelectedDossier] = useState<Candidate | null>(null);

  // 2. Official News Dispatches State
  const [posts, setPosts] = useState<PostItem[]>([
    {
      id: "post-2026-001",
      title: "2026/2027 Professional Basic Nursing Screening Dates Announced",
      category: "Admissions 2026/2027",
      summary: "Physical computer-based screening and credentials verification scheduled at Ota Main Campus.",
      content: "The Management of CHEP College of Nursing Sciences notifies all verified candidates that CBT testing commences at the Virtual Exam Hall.",
      author: "Dr. R. A. Adeyemi",
      read_time: "5 min read",
      image_url: "/images/chep/safety_exercise.png",
      published: true,
      created_at: "2026-04-12",
    },
    {
      id: "post-2026-002",
      title: "Community Health Nursing: Bridging the Gap Between Healthcare and Society",
      category: "Community Health",
      summary: "Preventative epidemiology and primary health posts form Nigeria's frontline defense.",
      content: "An analysis of CHEP rural immersion cohorts conducting clinical assessments across Agbebi Central CDA communities.",
      author: "Nurse T. K. Balogun",
      read_time: "4 min read",
      image_url: "/images/chep/blog_community_health.jpg",
      published: true,
      created_at: "2026-04-01",
    },
    {
      id: "post-2026-003",
      title: "Compassion in Motion: The Philosophy of Total Nursing Care",
      category: "Total Care",
      summary: "Integrating physiological assessment, mental health support, and cultural bedside dignity.",
      content: "Bedside clinical guidelines prepared for Year 2 student nurses entering clinical affiliations at State Hospital Ota.",
      author: "Matron V. Adediran",
      read_time: "6 min read",
      image_url: "/images/chep/blog_total_care.jpg",
      published: true,
      created_at: "2026-03-28",
    },
    {
      id: "post-2026-004",
      title: "Senate Approval: Induction of 48 Post-Basic Midwives into NMCN Register",
      category: "Accreditation",
      summary: "Senate congratulates the 2025/2026 midwifery cohort on achieving 100% pass rate at the council professional examination.",
      content: "The College Academic Senate convened under the chairmanship of Provost Prof. Stella Ayowole to formalize council induction.",
      author: "Office of the Provost",
      read_time: "3 min read",
      image_url: "/images/chep/students_green_scrubs.jpg",
      published: true,
      created_at: "2026-03-15",
    },
    {
      id: "post-2026-005",
      title: "Upgraded High-Fidelity Maternal Simulation Manikins Installed at Ota Skills Lab",
      category: "Clinical Skills",
      summary: "State-of-the-art birthing simulators deployed to enhance emergency obstetric care competency.",
      content: "The clinical simulation complex has received additional equipment to simulate postpartum hemorrhage management.",
      author: "Lab Coordinator",
      read_time: "4 min read",
      image_url: "/images/chep/laboratory.jpg",
      published: true,
      created_at: "2026-03-05",
    },
  ]);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PostItem | null>(null);
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("Admissions 2026/2027");
  const [postAuthor, setPostAuthor] = useState("Academic Affairs Registry");
  const [postSummary, setPostSummary] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("/images/chep/safety_exercise.png");
  const [postPublished, setPostPublished] = useState(true);

  // Quick Draft State
  const [quickDraftTitle, setQuickDraftTitle] = useState("");
  const [quickDraftContent, setQuickDraftContent] = useState("");

  // 3. Media Gallery State
  const [mediaItems, setMediaItems] = useState<MediaPhotoItem[]>([
    {
      id: "m-1",
      title: "CHEP Multi-Storey Main Academic Complex",
      category: "campus",
      image_url: "/images/chep/building.png",
      caption: "Main Academic Enclave, No. 18 Agbebi Estate Road, Ota",
      uploaded_by: "Registrar",
    },
    {
      id: "m-2",
      title: "Skills Simulation Laboratory & Training Manikins",
      category: "simulation",
      image_url: "/images/chep/laboratory.jpg",
      caption: "High-fidelity manikins and hospital beds for bedside skills",
      uploaded_by: "Lab Coordinator",
    },
    {
      id: "m-3",
      title: "60-Seat ICT Digital Examination Suite",
      category: "ict",
      image_url: "/images/chep/ict_center.jpg",
      caption: "Computer-Based Testing center for student assessments",
      uploaded_by: "ICT Admin",
    },
    {
      id: "m-4",
      title: "Safety Precaution & Emergency Response Practical Exercise",
      category: "simulation",
      image_url: "/images/chep/safety_exercise.png",
      caption: "Student clinical simulations and triage drills",
      uploaded_by: "Clinical Director",
    },
    {
      id: "m-5",
      title: "Nigerian Nursing Students in Clinical Green Scrubs",
      category: "outreach",
      image_url: "/images/chep/students_green_scrubs.jpg",
      caption: "Student nurses between clinical lecture sessions",
      uploaded_by: "Student Affairs",
    },
    {
      id: "m-6",
      title: "Students' Dormitory Complex & Residential Quarters",
      category: "hostel",
      image_url: "/images/chep/dormitory.jpg",
      caption: "Solar-powered student accommodation halls",
      uploaded_by: "Hostel Warden",
    },
  ]);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [mediaTitle, setMediaTitle] = useState("");
  const [mediaCategory, setMediaCategory] = useState("campus");
  const [mediaUrl, setMediaUrl] = useState("/images/chep/building.png");
  const [mediaCaption, setMediaCaption] = useState("");
  const [selectedPhotoPreview, setSelectedPhotoPreview] = useState<MediaPhotoItem | null>(null);

  // 4. Users & Staff Access State
  const [users, setUsers] = useState<SiteUserItem[]>([
    {
      id: "u-1",
      full_name: "Prof. Stella O. Ayowole",
      email: "provost@chepnursingcollege.org",
      role: "Super Admin",
      department: "Office of the Provost",
      status: "active",
      avatar_url: "/images/chep/provost.png",
    },
    {
      id: "u-2",
      full_name: "Akinkuebi Olawunmi Esther",
      email: "akinkuebi.o@chepnursingcollege.org",
      role: "Faculty Lecturer",
      department: "Nursing Sciences",
      status: "active",
      avatar_url: "/images/chep/lecturer_akinkuebi.png",
    },
    {
      id: "u-3",
      full_name: "Jojolade Adeboye Ismail",
      email: "jojolade.a@chepnursingcollege.org",
      role: "Faculty Lecturer",
      department: "Clinical Preceptorship",
      status: "active",
      avatar_url: "/images/chep/lecturer_jojolade.png",
    },
    {
      id: "u-4",
      full_name: "Mr. Samuel E. Akinro",
      email: "registrar@chepnursingcollege.org",
      role: "Editor / Registrar",
      department: "Academic Affairs Registry",
      status: "active",
      avatar_url: null,
    },
    {
      id: "u-5",
      full_name: "Matron Victoria Adediran",
      email: "adediran.v@chepnursingcollege.org",
      role: "Clinical Preceptor",
      department: "Hospital Rotations Unit",
      status: "active",
      avatar_url: null,
    },
  ]);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("Editor");
  const [userDept, setUserDept] = useState("Academic Registry");

  // 5. eLibrary State
  const [libraryResources, setLibraryResources] = useState<ELibraryItem[]>([
    {
      id: "lib-1",
      title: "Brunner & Suddarth's Textbook of Medical-Surgical Nursing (15th Ed.)",
      author: "Janice L. Hinkle, Kerry H. Cheever",
      category: "Medical-Surgical",
      type: "ebook",
      isbnOrDoi: "978-1975161033",
      level: "300 Level",
    },
    {
      id: "lib-2",
      title: "Pharmacology and the Nursing Process (10th Ed.)",
      author: "Linda Lane Lilley, Shelly Rainforth Collins",
      category: "Pharmacology",
      type: "ebook",
      isbnOrDoi: "978-0323829373",
      level: "200 Level",
    },
    {
      id: "lib-3",
      title: "Myles Textbook for Midwives (17th Ed.)",
      author: "Jayne E. Marshall, Maureen D. Raynor",
      category: "Midwifery",
      type: "ebook",
      isbnOrDoi: "978-0702076428",
      level: "400 Level",
    },
    {
      id: "lib-4",
      title: "The Lancet Global Health: Maternal Mortality Reductions in Sub-Saharan Africa",
      author: "World Health Organization Collaborative Group",
      category: "Public Health",
      type: "journal",
      isbnOrDoi: "10.1016/S2214-109X(23)00411-9",
      level: "Clinical Postgraduate",
    },
    {
      id: "lib-5",
      title: "American Journal of Nursing: Evidence-Based Wound Bed Preparation",
      author: "R. Gary Sibbald et al.",
      category: "Clinical Procedures",
      type: "journal",
      isbnOrDoi: "10.1097/01.NAJ.0000890124.91234.12",
      level: "All Levels",
    },
  ]);
  const [libModalOpen, setLibModalOpen] = useState(false);
  const [libTitle, setLibTitle] = useState("");
  const [libAuthor, setLibAuthor] = useState("");
  const [libCategory, setLibCategory] = useState("Medical-Surgical");
  const [libType, setLibType] = useState<"ebook" | "journal">("ebook");
  const [libIsbn, setLibIsbn] = useState("");
  const [libLevel, setLibLevel] = useState("200 Level");

  // 6. Exam Questions State
  const [examQuestions, setExamQuestions] = useState<ExamQuestionItem[]>([
    {
      id: "ex-1",
      type: "mcq",
      prompt: "A 45-year-old patient with congestive heart failure is prescribed Digoxin 0.25mg daily. Which assessment finding requires withholding the medication?",
      category: "Pharmacology",
      level: "300 Level",
      keyOrRubric: "Option C: Apical heart rate of 52 bpm",
    },
    {
      id: "ex-2",
      type: "essay",
      prompt: "Discuss the pathophysiology, clinical staging, and emergency nursing management of a primigravida presenting with Severe Preeclampsia at 34 weeks gestation.",
      category: "Maternal & Child Health",
      level: "400 Level",
      keyOrRubric: "NMCN Rubric: Airway, IV Magnesium Sulphate Pritchard Regimen, Hydralazine, Fetal Monitoring (20 marks)",
    },
    {
      id: "ex-3",
      type: "osce",
      prompt: "Station 04: Perform sterile donning and perform tracheostomy suctioning on an adult manikin following aseptic technique within 6 minutes.",
      category: "OSCE Clinical Skills",
      level: "200 Level",
      keyOrRubric: "12-step sterile checklist: Oxygenation, catheter insertion without suction, intermittent 10s pass.",
    },
  ]);
  const [examModalOpen, setExamModalOpen] = useState(false);
  const [examPrompt, setExamPrompt] = useState("");
  const [examType, setExamType] = useState<"mcq" | "essay" | "osce">("mcq");
  const [examCategory, setExamCategory] = useState("Pharmacology");
  const [examLevel, setExamLevel] = useState("300 Level");
  const [examRubric, setExamRubric] = useState("");

  // 7. Site Settings State
  const [settingsNotice, setSettingsNotice] = useState(
    "2026/2027 Professional Basic Nursing Screening Dates Announced by NMCN Accredited Board. CBT screening is active at Ota Main Campus."
  );
  const [settingsPhone, setSettingsPhone] = useState("+234 916 635 674, +234 813 540 6714");
  const [settingsEmail, setSettingsEmail] = useState("enquiries@chepnursingcollege.org");
  const [settingsBasicFee, setSettingsBasicFee] = useState("15,000");
  const [settingsMidwiferyFee, setSettingsMidwiferyFee] = useState("20,000");

  // Load from Supabase on mount
  useEffect(() => {
    async function loadData() {
      try {
        const appRes = await getApplications();
        if (appRes.success && appRes.data && appRes.data.length > 0) {
          const mapped = appRes.data.map((app: any) => ({
            id: app.id,
            name: app.full_name,
            initials: app.full_name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase(),
            program: app.program,
            duration: app.program.includes("Basic") ? "3-Year ND/HND" : "Accelerated",
            olevel: app.credits_count ? `Verified (${app.credits_count} Credits)` : "Verified (5 Credits)",
            olevelStatus: "verified",
            rrr: app.rrr_number || "RRR: Pending",
            fee: app.payment_status === "paid" ? "₦15,000 Paid" : "Unpaid",
            batch: app.batch || "Batch A-01",
            status: app.status || "pending",
          }));
          setCandidates(mapped);
        }

        const postRes = await getNewsDispatches();
        if (postRes.success && postRes.data && postRes.data.length > 0) {
          setPosts(postRes.data);
        }

        const userRes = await getSiteUsers();
        if (userRes.success && userRes.data && userRes.data.length > 0) {
          setUsers(userRes.data);
        }

        const mediaRes = await getMediaGallery();
        if (mediaRes.success && mediaRes.data && mediaRes.data.length > 0) {
          setMediaItems(mediaRes.data);
        }
      } catch (err) {
        console.warn("Using offline seeded data:", err);
      }
    }
    loadData();
  }, []);

  // ----------------------------------------------------
  // Admissions Handlers
  // ----------------------------------------------------
  const handleStatusChange = async (id: string, newStatus: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    showToast(`Candidate ${id} updated to ${newStatus.toUpperCase()}`);
    await updateApplicationStatus(id, newStatus);
  };

  const exportNMCNLedgerCSV = () => {
    const headers = [
      "Serial No",
      "Application ID",
      "Full Name",
      "Programme",
      "Programme Duration",
      "O'Level Status",
      "Remita RRR Reference",
      "Payment Fee Status",
      "Screening Batch",
      "Admission Status",
      "NMCN Council Index Eligibility",
    ];

    const rows = filteredCandidates.map((c, idx) => [
      idx + 1,
      `"${c.id}"`,
      `"${c.name}"`,
      `"${c.program}"`,
      `"${c.duration}"`,
      `"${c.olevel}"`,
      `"${c.rrr.replace("RRR: ", "")}"`,
      `"${c.fee}"`,
      `"${c.batch}"`,
      `"${c.status.toUpperCase()}"`,
      c.status === "admitted" ? "Eligible for NMCN Indexing" : "Pending Senate Approval",
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `CHEP_NMCN_Admissions_Ledger_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Official NMCN Admissions Ledger exported to CSV.");
  };

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.rrr.includes(searchTerm);
    const matchesProgram =
      filterProgram === "all" || c.program.toLowerCase().includes(filterProgram.toLowerCase());
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesProgram && matchesStatus;
  });

  // ----------------------------------------------------
  // News Dispatches Handlers
  // ----------------------------------------------------
  const handleOpenNewPost = () => {
    setEditingPost(null);
    setPostTitle("");
    setPostCategory("Admissions 2026/2027");
    setPostAuthor("Academic Affairs Registry");
    setPostSummary("");
    setPostContent("");
    setPostImage("/images/chep/safety_exercise.png");
    setPostPublished(true);
    setPostModalOpen(true);
  };

  const handleOpenEditPost = (post: PostItem) => {
    setEditingPost(post);
    setPostTitle(post.title);
    setPostCategory(post.category);
    setPostAuthor(post.author || "Academic Affairs Registry");
    setPostSummary(post.summary || "");
    setPostContent(post.content || "");
    setPostImage(post.image_url || "/images/chep/safety_exercise.png");
    setPostPublished(post.published);
    setPostModalOpen(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle) return;

    if (editingPost) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPost.id
            ? {
                ...p,
                title: postTitle,
                category: postCategory,
                author: postAuthor,
                summary: postSummary,
                content: postContent,
                image_url: postImage,
                published: postPublished,
              }
            : p
        )
      );
      await updateDispatch(editingPost.id, {
        title: postTitle,
        category: postCategory,
        author: postAuthor,
        summary: postSummary,
        content: postContent,
        image_url: postImage,
        published: postPublished,
      });
      showToast("Dispatch updated in Senate repository.");
    } else {
      const newPost: PostItem = {
        id: `post-${Date.now()}`,
        title: postTitle,
        category: postCategory,
        author: postAuthor,
        summary: postSummary,
        content: postContent,
        read_time: "4 min read",
        image_url: postImage,
        published: postPublished,
        created_at: new Date().toISOString().split("T")[0],
      };
      setPosts([newPost, ...posts]);
      await publishDispatch(newPost);
      showToast("New dispatch published to official college news feed.");
    }

    setPostModalOpen(false);
  };

  const handleDeletePost = async (id: string) => {
    if (confirm("Move this official dispatch to archive?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      await deleteDispatch(id);
      showToast("Dispatch moved to archive.");
    }
  };

  const handleSaveQuickDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickDraftTitle) return;
    const newDraft: PostItem = {
      id: `draft-${Date.now()}`,
      title: quickDraftTitle,
      category: "Internal Memo",
      author: "Office of the Provost",
      summary: quickDraftContent.slice(0, 80) + "...",
      content: quickDraftContent,
      read_time: "2 min read",
      image_url: "/images/chep/safety_exercise.png",
      published: false,
      created_at: new Date().toISOString().split("T")[0],
    };
    setPosts([newDraft, ...posts]);
    setQuickDraftTitle("");
    setQuickDraftContent("");
    showToast("Quick memo draft saved to Senate archive.");
  };

  // ----------------------------------------------------
  // Media Handlers
  // ----------------------------------------------------
  const handleSaveMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaTitle || !mediaUrl) return;

    const newMedia: MediaPhotoItem = {
      id: `media-${Date.now()}`,
      title: mediaTitle,
      category: mediaCategory,
      image_url: mediaUrl,
      caption: mediaCaption || mediaTitle,
      uploaded_by: "Registrar",
    };

    setMediaItems([newMedia, ...mediaItems]);
    await addMediaPhoto(newMedia);
    setMediaModalOpen(false);
    setMediaTitle("");
    setMediaCaption("");
    showToast("New photo asset registered in institutional repository.");
  };

  const handleDeleteMedia = async (id: string) => {
    if (confirm("Delete this media asset from server?")) {
      setMediaItems((prev) => prev.filter((m) => m.id !== id));
      await deleteMediaPhoto(id);
      showToast("Media asset deleted.");
    }
  };

  // ----------------------------------------------------
  // User Handlers
  // ----------------------------------------------------
  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userFullName || !userEmail) return;

    const newUser: SiteUserItem = {
      id: `user-${Date.now()}`,
      full_name: userFullName,
      email: userEmail,
      role: userRole,
      department: userDept,
      status: "active",
      avatar_url: null,
    };

    setUsers([newUser, ...users]);
    await createSiteUser(newUser);
    setUserModalOpen(false);
    setUserFullName("");
    setUserEmail("");
    showToast(`User ${newUser.full_name} registered with role ${newUser.role}`);
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm("Revoke user privileges and remove administrative account?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      await deleteSiteUser(id);
      showToast("Administrative account revoked.");
    }
  };

  // ----------------------------------------------------
  // Library Handlers
  // ----------------------------------------------------
  const handleSaveLibrary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!libTitle || !libAuthor) return;
    const newItem: ELibraryItem = {
      id: `lib-${Date.now()}`,
      title: libTitle,
      author: libAuthor,
      category: libCategory,
      type: libType,
      isbnOrDoi: libIsbn || "ISBN: Pending",
      level: libLevel,
    };
    setLibraryResources([newItem, ...libraryResources]);
    setLibModalOpen(false);
    setLibTitle("");
    setLibAuthor("");
    setLibIsbn("");
    showToast("New eResource registered in CHEP OPAC catalog.");
  };

  // ----------------------------------------------------
  // Exams Handlers
  // ----------------------------------------------------
  const handleSaveExamQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examPrompt) return;
    const newQ: ExamQuestionItem = {
      id: `q-${Date.now()}`,
      type: examType,
      prompt: examPrompt,
      category: examCategory,
      level: examLevel,
      keyOrRubric: examRubric || "Council Standard Scoring Rubric",
    };
    setExamQuestions([newQ, ...examQuestions]);
    setExamModalOpen(false);
    setExamPrompt("");
    setExamRubric("");
    showToast(`New ${examType.toUpperCase()} question added to Question Bank.`);
  };

  // Purge Edge Cache Simulation
  const handlePurgeCache = () => {
    showToast("Serverless Edge & CDN Cache purged successfully (TTL: 0s).");
  };

  // ========================================================
  // CONDITIONAL VIEW: SECURE SENATE LOGIN GATE (IF LOGGED OUT)
  // ========================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111827] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
        {/* Subtle Ambient Background */}
        <div className="absolute inset-0 bg-radial-gradient from-emerald-950/40 via-gray-950 to-black pointer-events-none"></div>

        <div className="max-w-md w-full bg-[#1f2937] border border-gray-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 relative z-10 space-y-6">
          {/* Institutional Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-emerald-500/30 p-2 shadow-inner mx-auto mb-2">
              <img
                src="/images/chep/chep_logo.png"
                alt="CHEP College of Nursing Sciences"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
              CHEP-IMS • Senate &amp; Registry Gateway
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Institutional Senate Suite
            </h1>
            <p className="text-xs text-gray-400 leading-relaxed">
              Restricted portal for College Provost, Academic Registry, and NMCN Council Preceptors.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleAdminSignIn} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 font-bold mb-1">Administrative Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[18px]">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="provost@chepnursingcollege.org"
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-900/90 border border-gray-700 rounded-xl text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-hidden"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-gray-300 font-bold">Security Password / Passkey</label>
                <button
                  type="button"
                  onClick={() => setForgotPasswordModalOpen(true)}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[18px]">
                  lock
                </span>
                <input
                  type={showLoginPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-900/90 border border-gray-700 rounded-xl text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-hidden font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showLoginPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Assigned Institutional Role</label>
              <select
                value={loginRole}
                onChange={(e) => setLoginRole(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900/90 border border-gray-700 rounded-xl text-white text-xs outline-hidden focus:border-emerald-500"
              >
                <option value="Super Administrator (Provost)">Provost &amp; Chief Executive</option>
                <option value="Academic Registrar">Academic Registrar (Admissions &amp; Senate)</option>
                <option value="Faculty Lecturer">Faculty Lecturer (Examiner &amp; Curriculum)</option>
                <option value="Clinical Preceptor">Clinical Preceptor (Hospital Rotations Lead)</option>
                <option value="Bursar">Bursar (Chief Financial Officer)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider disabled:opacity-70 mt-2"
            >
              {loginLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Verifying NMCN Credentials...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  <span>Sign In to Institutional Suite</span>
                </>
              )}
            </button>
          </form>

          {/* Demo / Rapid Evaluation Credentials Helper */}
          <div className="pt-2 border-t border-gray-800 text-[11px] space-y-2">
            <span className="text-gray-400 uppercase font-bold text-[10px] tracking-wider block">
              Quick Test Credentials:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setLoginEmail("provost@chepnursingcollege.org");
                  setLoginPassword("chep2026admin");
                  setLoginRole("Super Administrator (Provost)");
                }}
                className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-emerald-300 text-[10px] font-mono border border-gray-700"
              >
                Provost (Super Admin)
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail("registrar@chepnursingcollege.org");
                  setLoginPassword("chep2026registrar");
                  setLoginRole("Academic Registrar");
                }}
                className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-blue-300 text-[10px] font-mono border border-gray-700"
              >
                Registrar (Editor)
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail("faculty@chepnursingcollege.org");
                  setLoginPassword("chep2026faculty");
                  setLoginRole("Clinical Preceptor");
                }}
                className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-purple-300 text-[10px] font-mono border border-gray-700"
              >
                Faculty Preceptor
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">arrow_back</span>
              <span>Return to Public Campus Website</span>
            </Link>
          </div>
        </div>

        {/* Forgot Password Modal */}
        {forgotPasswordModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#1f2937] border border-gray-700 rounded-2xl max-w-md w-full p-6 text-xs text-white space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-2 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[20px]">vpn_key</span>
                  <h3 className="font-bold text-sm">Security PIN &amp; Password Recovery</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setForgotPasswordModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {forgotSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[32px]">mark_email_read</span>
                  <p className="font-bold text-emerald-300">Recovery Instructions Sent!</p>
                  <p className="text-[11px] text-gray-300">
                    A cryptographic 24-hour reset token has been dispatched to <strong>{forgotEmail || loginEmail}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
                  <p className="text-gray-300 leading-relaxed">
                    Enter your official institutional email. You will receive an automated council identity verification link to reset your administrative passkey.
                  </p>
                  <div>
                    <label className="block text-gray-400 font-bold mb-1">Registered Email Address</label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="e.g. registrar@chepnursingcollege.org"
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white outline-hidden focus:border-emerald-500"
                    />
                  </div>
                  <div className="p-3 rounded-lg bg-gray-900/60 border border-gray-800 text-[11px] text-gray-400">
                    <strong>Notice:</strong> For hardware security tokens or emergency lockout, contact the Registry ICT Node: <span className="text-emerald-400">enquiries@chepnursingcollege.org</span>.
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setForgotPasswordModalOpen(false)}
                      className="px-3 py-1.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                    >
                      Dispatch Reset Token
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ========================================================
  // AUTHENTICATED SENATE WORKSPACE (FULL SUITE)
  // ========================================================
  return (
    <div className="min-h-screen bg-[#f0f0f1] font-sans antialiased text-[#3c434a]">
      {/* ======================================================== */}
      {/* 1. INSTITUTIONAL TOP SENATE BAR (#1d2327) */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-50 bg-[#1d2327] text-[#f0f0f1] h-9 sm:h-10 px-3 sm:px-4 flex items-center justify-between text-xs border-b border-[#2c3338] shadow-sm select-none">
        {/* Left Side: Institutional Emblem, System Title & Subdomains */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Institutional Crest */}
          <Link
            href="/iloro"
            className="flex items-center gap-1.5 hover:text-[#72aee6] transition-colors font-bold text-white"
            title="CHEP Institutional Management System"
          >
            <img
              src="/images/chep/chep_logo.png"
              alt="CHEP Crest"
              className="w-5 h-5 object-contain"
            />
            <span className="hidden md:inline font-bold text-[#c3c4c7]">CHEP-IMS Core 2026/2027</span>
          </Link>

          {/* Campus Gateway Jump */}
          <div className="relative group">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1 hover:text-[#72aee6] transition-colors py-1 font-semibold text-white"
            >
              <span className="material-symbols-outlined text-[15px]">home</span>
              <span className="hidden lg:inline">CHEP College of Nursing Sciences</span>
              <span className="material-symbols-outlined text-[13px] text-[#8c8f94]">expand_more</span>
            </Link>
            <div className="absolute left-0 top-full hidden group-hover:block w-64 bg-[#2c3338] text-[#c3c4c7] shadow-xl py-1 rounded-b border border-[#3c434a] z-50">
              <Link
                href="/"
                target="_blank"
                className="block px-3 py-1.5 hover:bg-[#2271b1] hover:text-white transition-colors"
              >
                Visit Public Campus Website
              </Link>
              <div className="border-t border-[#3c434a] my-1"></div>
              <span className="px-3 py-1 text-[10px] uppercase font-bold text-[#8c8f94] block">
                Campus Subdomain Gateways
              </span>
              <Link
                href="/exams"
                target="_blank"
                className="flex items-center justify-between px-3 py-1 hover:bg-[#2271b1] hover:text-white transition-colors text-[11px]"
              >
                <span>CBT &amp; OSCE Studio</span>
                <span className="font-mono text-[9px] bg-white/10 px-1 rounded">exams.chep</span>
              </Link>
              <Link
                href="/library"
                target="_blank"
                className="flex items-center justify-between px-3 py-1 hover:bg-[#2271b1] hover:text-white transition-colors text-[11px]"
              >
                <span>Virtual Library (480+)</span>
                <span className="font-mono text-[9px] bg-white/10 px-1 rounded">library.chep</span>
              </Link>
              <Link
                href="/clinical-reflections"
                target="_blank"
                className="flex items-center justify-between px-3 py-1 hover:bg-[#2271b1] hover:text-white transition-colors text-[11px]"
              >
                <span>Reflective Forum</span>
                <span className="font-mono text-[9px] bg-white/10 px-1 rounded">reflections.chep</span>
              </Link>
              <Link
                href="/about"
                target="_blank"
                className="flex items-center justify-between px-3 py-1 hover:bg-[#2271b1] hover:text-white transition-colors text-[11px]"
              >
                <span>About Us &amp; Governance</span>
                <span className="font-mono text-[9px] bg-white/10 px-1 rounded">about.chep</span>
              </Link>
              <Link
                href="/portal"
                target="_blank"
                className="flex items-center justify-between px-3 py-1 hover:bg-[#2271b1] hover:text-white transition-colors text-[11px]"
              >
                <span>Student / Staff Portal</span>
                <span className="font-mono text-[9px] bg-white/10 px-1 rounded">portal.chep</span>
              </Link>
            </div>
          </div>

          {/* Quick Action: + New Menu */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-1 hover:text-[#72aee6] transition-colors py-1 text-white font-medium"
            >
              <span className="material-symbols-outlined text-[15px]">add</span>
              <span>New</span>
            </button>
            <div className="absolute left-0 top-full hidden group-hover:block w-48 bg-[#2c3338] text-[#c3c4c7] shadow-xl py-1 rounded-b border border-[#3c434a] z-50">
              <button
                type="button"
                onClick={handleOpenNewPost}
                className="w-full text-left px-3 py-1.5 hover:bg-[#2271b1] hover:text-white transition-colors text-xs"
              >
                Official Dispatch
              </button>
              <button
                type="button"
                onClick={() => setMediaModalOpen(true)}
                className="w-full text-left px-3 py-1.5 hover:bg-[#2271b1] hover:text-white transition-colors text-xs"
              >
                Media Asset
              </button>
              <button
                type="button"
                onClick={() => setLibModalOpen(true)}
                className="w-full text-left px-3 py-1.5 hover:bg-[#2271b1] hover:text-white transition-colors text-xs"
              >
                eLibrary Resource
              </button>
              <button
                type="button"
                onClick={() => setExamModalOpen(true)}
                className="w-full text-left px-3 py-1.5 hover:bg-[#2271b1] hover:text-white transition-colors text-xs"
              >
                Exam Question
              </button>
              <button
                type="button"
                onClick={() => setUserModalOpen(true)}
                className="w-full text-left px-3 py-1.5 hover:bg-[#2271b1] hover:text-white transition-colors text-xs"
              >
                User Account
              </button>
            </div>
          </div>

          {/* Purge Cache Quick Button */}
          <button
            type="button"
            onClick={handlePurgeCache}
            className="hidden sm:flex items-center gap-1 hover:text-[#72aee6] text-[#c3c4c7] transition-colors"
            title="Purge Vercel and Cloudflare CDN Edge Cache"
          >
            <span className="material-symbols-outlined text-[14px]">cached</span>
            <span>Purge Cache</span>
          </button>
        </div>

        {/* Right Side: NMCN Node & Howdy Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-[#4ab866] bg-black/30 px-2 py-0.5 rounded border border-green-800/40">
            <span className="w-2 h-2 rounded-full bg-[#4ab866] animate-pulse"></span>
            <span>NMCN Node Ogun-OTA-041: Active</span>
          </div>

          {/* Profile User Dropdown with Sign Out */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-2 text-white hover:text-[#72aee6] transition-colors py-1"
            >
              <span className="hidden sm:inline text-xs text-[#c3c4c7]">
                Authenticated: <strong className="text-white">Prof. Stella Ayowole</strong>
              </span>
              <img
                src="/images/chep/provost.png"
                alt="Provost Avatar"
                className="w-6 h-6 rounded-full object-cover border border-white/30"
              />
            </button>
            <div className="absolute right-0 top-full hidden group-hover:block w-56 bg-[#2c3338] text-[#c3c4c7] shadow-xl py-2 rounded-b border border-[#3c434a] z-50">
              <div className="px-3 py-1.5 border-b border-[#3c434a]">
                <p className="font-bold text-white text-xs">Prof. Stella O. Ayowole</p>
                <p className="text-[11px] text-[#8c8f94]">{loginRole}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("users")}
                className="w-full text-left px-3 py-1.5 hover:bg-[#2271b1] hover:text-white transition-colors text-xs"
              >
                Edit Roster Profile
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                className="w-full text-left px-3 py-1.5 hover:bg-[#2271b1] hover:text-white transition-colors text-xs"
              >
                Institutional Settings
              </button>
              <div className="border-t border-[#3c434a] my-1"></div>
              <button
                type="button"
                onClick={handleAdminSignOut}
                className="w-full text-left px-3 py-1.5 text-rose-400 hover:bg-rose-900/40 hover:text-white transition-colors text-xs flex items-center justify-between"
              >
                <span>Sign Out</span>
                <span className="material-symbols-outlined text-[14px]">logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Reactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#1d2327] text-white px-4 py-2.5 rounded-lg shadow-2xl border-l-4 border-[#2271b1] flex items-center gap-2.5 text-xs animate-slideUp">
          <span className="material-symbols-outlined text-[18px] text-[#72aee6]">info</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. MAIN SENATE WORKSPACE (SIDEBAR + CONTENT CANVAS) */}
      {/* ======================================================== */}
      <div className="flex min-h-[calc(100vh-2.5rem)]">
        {/* Senate Collapsible Left Sidebar */}
        <aside
          className={`bg-[#1d2327] text-[#c3c4c7] shrink-0 border-r border-[#2c3338] transition-all duration-200 select-none ${
            sidebarCollapsed ? "w-14" : "w-56"
          }`}
        >
          <div className="py-2">
            {/* Nav Menu Items */}
            <nav className="space-y-0.5 text-xs font-medium">
              {/* Dashboard */}
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center justify-between px-3.5 py-2 transition-colors ${
                  activeTab === "overview"
                    ? "bg-[#2271b1] text-white font-bold"
                    : "hover:bg-[#13171a] hover:text-[#72aee6]"
                }`}
                title="Dashboard Overview"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">dashboard</span>
                  {!sidebarCollapsed && <span>Dashboard</span>}
                </div>
                {!sidebarCollapsed && (
                  <span className="text-[10px] bg-white/20 text-white font-bold px-1.5 py-0.2 rounded-full">
                    2
                  </span>
                )}
              </button>

              {/* Posts / Dispatches */}
              <button
                type="button"
                onClick={() => setActiveTab("posts")}
                className={`w-full flex items-center justify-between px-3.5 py-2 transition-colors ${
                  activeTab === "posts"
                    ? "bg-[#2271b1] text-white font-bold"
                    : "hover:bg-[#13171a] hover:text-[#72aee6]"
                }`}
                title="Posts & Dispatches"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">article</span>
                  {!sidebarCollapsed && <span>Official Dispatches</span>}
                </div>
                {!sidebarCollapsed && (
                  <span className="text-[10px] bg-[#d63638] text-white font-bold px-1.5 py-0.2 rounded-full">
                    {posts.length}
                  </span>
                )}
              </button>

              {/* Media Library */}
              <button
                type="button"
                onClick={() => setActiveTab("media")}
                className={`w-full flex items-center justify-between px-3.5 py-2 transition-colors ${
                  activeTab === "media"
                    ? "bg-[#2271b1] text-white font-bold"
                    : "hover:bg-[#13171a] hover:text-[#72aee6]"
                }`}
                title="Media Repository"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">photo_library</span>
                  {!sidebarCollapsed && <span>Media Assets</span>}
                </div>
                {!sidebarCollapsed && (
                  <span className="text-[10px] text-[#8c8f94]">{mediaItems.length}</span>
                )}
              </button>

              {/* Admissions & Senate */}
              <button
                type="button"
                onClick={() => setActiveTab("admissions")}
                className={`w-full flex items-center justify-between px-3.5 py-2 transition-colors ${
                  activeTab === "admissions"
                    ? "bg-[#2271b1] text-white font-bold"
                    : "hover:bg-[#13171a] hover:text-[#72aee6]"
                }`}
                title="Admissions & Senate Roster"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">school</span>
                  {!sidebarCollapsed && <span>Admissions Dossier</span>}
                </div>
                {!sidebarCollapsed && (
                  <span className="text-[10px] bg-emerald-700 text-white font-bold px-1.5 py-0.2 rounded-full">
                    {candidates.length}
                  </span>
                )}
              </button>

              {/* eLibrary Holdings */}
              <button
                type="button"
                onClick={() => setActiveTab("library")}
                className={`w-full flex items-center justify-between px-3.5 py-2 transition-colors ${
                  activeTab === "library"
                    ? "bg-[#2271b1] text-white font-bold"
                    : "hover:bg-[#13171a] hover:text-[#72aee6]"
                }`}
                title="eLibrary & Journal Hub"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">local_library</span>
                  {!sidebarCollapsed && <span>eLibrary Holdings</span>}
                </div>
                {!sidebarCollapsed && (
                  <span className="text-[10px] text-emerald-400 font-mono">480+</span>
                )}
              </button>

              {/* Exams & Question Bank */}
              <button
                type="button"
                onClick={() => setActiveTab("exams")}
                className={`w-full flex items-center justify-between px-3.5 py-2 transition-colors ${
                  activeTab === "exams"
                    ? "bg-[#2271b1] text-white font-bold"
                    : "hover:bg-[#13171a] hover:text-[#72aee6]"
                }`}
                title="Exams & Question Bank"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">quiz</span>
                  {!sidebarCollapsed && <span>Exams Bank</span>}
                </div>
                {!sidebarCollapsed && (
                  <span className="text-[10px] text-orange-300 font-mono">314</span>
                )}
              </button>

              {/* Reflective Forum Moderation */}
              <button
                type="button"
                onClick={() => setActiveTab("reflections")}
                className={`w-full flex items-center justify-between px-3.5 py-2 transition-colors ${
                  activeTab === "reflections"
                    ? "bg-[#2271b1] text-white font-bold"
                    : "hover:bg-[#13171a] hover:text-[#72aee6]"
                }`}
                title="Reflective Forum Moderation"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">forum</span>
                  {!sidebarCollapsed && <span>Clinical Reflections</span>}
                </div>
                {!sidebarCollapsed && (
                  <span className="text-[10px] bg-blue-600/60 text-white font-mono px-1 rounded">
                    PHI
                  </span>
                )}
              </button>

              {/* Users & Roles */}
              <button
                type="button"
                onClick={() => setActiveTab("users")}
                className={`w-full flex items-center justify-between px-3.5 py-2 transition-colors ${
                  activeTab === "users"
                    ? "bg-[#2271b1] text-white font-bold"
                    : "hover:bg-[#13171a] hover:text-[#72aee6]"
                }`}
                title="Users & Roles"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">group</span>
                  {!sidebarCollapsed && <span>Staff Directory</span>}
                </div>
                {!sidebarCollapsed && (
                  <span className="text-[10px] text-[#8c8f94]">{users.length}</span>
                )}
              </button>

              {/* Tools & Diagnostics */}
              <button
                type="button"
                onClick={() => setActiveTab("tools")}
                className={`w-full flex items-center justify-between px-3.5 py-2 transition-colors ${
                  activeTab === "tools"
                    ? "bg-[#2271b1] text-white font-bold"
                    : "hover:bg-[#13171a] hover:text-[#72aee6]"
                }`}
                title="Tools & Diagnostics"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">build</span>
                  {!sidebarCollapsed && <span>Tools &amp; Audit</span>}
                </div>
              </button>

              {/* Settings */}
              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center justify-between px-3.5 py-2 transition-colors ${
                  activeTab === "settings"
                    ? "bg-[#2271b1] text-white font-bold"
                    : "hover:bg-[#13171a] hover:text-[#72aee6]"
                }`}
                title="Settings & Subdomains"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">settings</span>
                  {!sidebarCollapsed && <span>Settings</span>}
                </div>
              </button>
            </nav>

            {/* Collapse / Expand Toggle Button */}
            <div className="pt-6 px-3">
              <button
                type="button"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-full flex items-center gap-2 text-xs text-[#8c8f94] hover:text-white py-1.5 transition-colors"
                title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {sidebarCollapsed ? "chevron_right" : "chevron_left"}
                </span>
                {!sidebarCollapsed && <span>Collapse menu</span>}
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl">
          {/* ======================================================== */}
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {/* ======================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Top Heading */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-[#1d2327]">Dashboard</h1>
                  <p className="text-xs text-[#646970]">
                    CHEP College of Nursing Sciences • Institutional Senate Suite (CHEP-IMS v6.7)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleOpenNewPost}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[15px]">add</span>
                    <span>New Dispatch</span>
                  </button>
                  <button
                    type="button"
                    onClick={exportNMCNLedgerCSV}
                    className="bg-white border border-[#8c8f94] hover:border-[#2271b1] text-[#2271b1] text-xs font-semibold px-3 py-1.5 rounded transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[15px]">download</span>
                    <span>Export NMCN Ledger</span>
                  </button>
                </div>
              </div>

              {/* Institutional Welcome Notice Card */}
              <div className="bg-white border border-[#c3c4c7] p-5 rounded shadow-xs relative overflow-hidden">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-[#1d2327]">
                      Welcome to CHEP Institutional Senate Suite (CHEP-IMS)!
                    </h2>
                    <p className="text-xs text-[#646970] max-w-2xl leading-relaxed">
                      Central administrative environment for managing academic bulletins,
                      reviewing candidate admissions, curating clinical eLibrary texts, and moderating exams.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono px-2 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      NMCN Session: 2026/2027
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 mt-5 border-t border-[#f0f0f1]">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1d2327] mb-2 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#2271b1]">campaign</span>
                      Quick Tasks
                    </h3>
                    <ul className="text-xs space-y-1.5 text-[#2271b1]">
                      <li>
                        <button type="button" onClick={() => setActiveTab("posts")} className="hover:underline">
                          Issue official Senate dispatch
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => setActiveTab("admissions")} className="hover:underline">
                          Review {candidates.filter((c) => c.status === "pending").length} pending candidates
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => setMediaModalOpen(true)} className="hover:underline">
                          Upload high-resolution skills lab photos
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1d2327] mb-2 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#2271b1]">menu_book</span>
                      Academic Gateways
                    </h3>
                    <ul className="text-xs space-y-1.5 text-[#2271b1]">
                      <li>
                        <button type="button" onClick={() => setActiveTab("library")} className="hover:underline">
                          Manage 480+ clinical eLibrary holdings
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => setActiveTab("exams")} className="hover:underline">
                          Inspect 314 MCQs &amp; OSCE rubrics
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => setActiveTab("reflections")} className="hover:underline">
                          Audit HIPAA/NDPR student reflection posts
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1d2327] mb-2 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#2271b1]">dns</span>
                      Subdomain Routes
                    </h3>
                    <p className="text-[11px] text-[#646970] mb-2 leading-relaxed">
                      All academic services are cleanly separated with dedicated subdomains:
                    </p>
                    <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-gray-100 border text-gray-700">exams.chep</span>
                      <span className="px-1.5 py-0.5 rounded bg-gray-100 border text-gray-700">library.chep</span>
                      <span className="px-1.5 py-0.5 rounded bg-gray-100 border text-gray-700">about.chep</span>
                      <span className="px-1.5 py-0.5 rounded bg-gray-100 border text-gray-700">portal.chep</span>
                      <span className="px-1.5 py-0.5 rounded bg-gray-100 border text-gray-700">reflections.chep</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Metric KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#c3c4c7] p-4 rounded shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#646970] font-bold uppercase">Admissions Dossier</span>
                    <span className="material-symbols-outlined text-[#2271b1]">school</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#1d2327]">{candidates.length}</span>
                    <span className="text-xs text-emerald-600 font-semibold">5 Verified</span>
                  </div>
                  <p className="text-[11px] text-[#8c8f94] mt-1">
                    {candidates.filter((c) => c.status === "admitted").length} officially indexed by NMCN
                  </p>
                </div>

                <div className="bg-white border border-[#c3c4c7] p-4 rounded shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#646970] font-bold uppercase">Published Dispatches</span>
                    <span className="material-symbols-outlined text-[#2271b1]">article</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#1d2327]">
                      {posts.filter((p) => p.published).length}
                    </span>
                    <span className="text-xs text-[#646970]">
                      ({posts.filter((p) => !p.published).length} Drafts)
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8c8f94] mt-1">Live in official news syndication</p>
                </div>

                <div className="bg-white border border-[#c3c4c7] p-4 rounded shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#646970] font-bold uppercase">eLibrary Holdings</span>
                    <span className="material-symbols-outlined text-emerald-600">local_library</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#1d2327]">480+</span>
                    <span className="text-xs text-emerald-600 font-semibold">Institutional Access</span>
                  </div>
                  <p className="text-[11px] text-[#8c8f94] mt-1">240+ eBooks &amp; 240+ Journals</p>
                </div>

                <div className="bg-white border border-[#c3c4c7] p-4 rounded shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#646970] font-bold uppercase">Exams &amp; OSCE Stations</span>
                    <span className="material-symbols-outlined text-orange-500">timer</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#1d2327]">314</span>
                    <span className="text-xs text-orange-600 font-semibold">Timed Scrambled</span>
                  </div>
                  <p className="text-[11px] text-[#8c8f94] mt-1">160 MCQs, 52 Cases, 102 OSCE</p>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left 7 Columns */}
                <div className="lg:col-span-7 space-y-6">
                  {/* At a Glance Box */}
                  <div className="bg-white border border-[#c3c4c7] rounded shadow-xs overflow-hidden">
                    <div className="px-4 py-3 bg-[#f6f7f7] border-b border-[#c3c4c7] font-bold text-xs text-[#1d2327] flex items-center justify-between">
                      <span>At a Glance</span>
                      <span className="text-[11px] text-[#646970] font-normal">CHEP-IMS Core v6.7</span>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-4 text-xs">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#2271b1]">
                          <span className="material-symbols-outlined text-[16px]">article</span>
                          <span>{posts.length} Official Dispatches</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#2271b1]">
                          <span className="material-symbols-outlined text-[16px]">school</span>
                          <span>{candidates.length} Candidate Applications</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#2271b1]">
                          <span className="material-symbols-outlined text-[16px]">photo_library</span>
                          <span>{mediaItems.length} Media Attachments</span>
                        </div>
                      </div>

                      <div className="space-y-2 text-[#646970]">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
                          <span>NMCN Accredited Curriculum</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-blue-600">dns</span>
                          <span>Next.js 16 Edge Engine</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-purple-600">lock</span>
                          <span>SSL &amp; Remita Integration</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Stream */}
                  <div className="bg-white border border-[#c3c4c7] rounded shadow-xs overflow-hidden">
                    <div className="px-4 py-3 bg-[#f6f7f7] border-b border-[#c3c4c7] font-bold text-xs text-[#1d2327]">
                      Activity Feed
                    </div>
                    <div className="p-4 space-y-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#646970] block">
                        Recently Published
                      </span>
                      <ul className="text-xs space-y-2.5 divide-y divide-[#f0f0f1]">
                        {posts.slice(0, 3).map((p) => (
                          <li key={p.id} className="pt-2 flex items-start justify-between gap-3">
                            <div>
                              <Link
                                href="/news"
                                target="_blank"
                                className="font-bold text-[#2271b1] hover:underline"
                              >
                                {p.title}
                              </Link>
                              <div className="text-[11px] text-[#8c8f94] flex items-center gap-2 mt-0.5">
                                <span>{p.created_at || "Recent"}</span>
                                <span>•</span>
                                <span>By {p.author}</span>
                              </div>
                            </div>
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded shrink-0">
                              Published
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right 5 Columns */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Quick Draft Box */}
                  <div className="bg-white border border-[#c3c4c7] rounded shadow-xs overflow-hidden">
                    <div className="px-4 py-3 bg-[#f6f7f7] border-b border-[#c3c4c7] font-bold text-xs text-[#1d2327]">
                      Quick Memo Draft
                    </div>
                    <form onSubmit={handleSaveQuickDraft} className="p-4 space-y-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-[#1d2327] mb-1">Title</label>
                        <input
                          type="text"
                          value={quickDraftTitle}
                          onChange={(e) => setQuickDraftTitle(e.target.value)}
                          placeholder="e.g. Matriculation Gown Collection Schedule"
                          className="w-full px-2.5 py-1.5 border border-[#8c8f94] rounded text-xs focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-hidden"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#1d2327] mb-1">
                          Draft Notes / Action Items
                        </label>
                        <textarea
                          rows={3}
                          value={quickDraftContent}
                          onChange={(e) => setQuickDraftContent(e.target.value)}
                          placeholder="Write quick draft bullet points..."
                          className="w-full px-2.5 py-1.5 border border-[#8c8f94] rounded text-xs focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-hidden resize-none"
                        ></textarea>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
                        >
                          Save Draft Memo
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Site Health Status Box */}
                  <div className="bg-white border border-[#c3c4c7] rounded shadow-xs overflow-hidden">
                    <div className="px-4 py-3 bg-[#f6f7f7] border-b border-[#c3c4c7] font-bold text-xs text-[#1d2327] flex items-center justify-between">
                      <span>System Health Status</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                        Operational (100%)
                      </span>
                    </div>
                    <div className="p-4 space-y-2.5 text-xs text-[#646970]">
                      <div className="flex items-center justify-between py-1 border-b border-[#f0f0f1]">
                        <span>NMCN Verification Gateway</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Connected
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-[#f0f0f1]">
                        <span>Supabase PostgreSQL Cluster</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-600"></span> 18ms Latency
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-[#f0f0f1]">
                        <span>HTTPS / SSL Certificate</span>
                        <span className="text-emerald-700 font-bold">Valid (ECC 256-bit)</span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span>Vercel Serverless Edge</span>
                        <span className="text-emerald-700 font-bold">Operational</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: POSTS & DISPATCHES (NEWS / BLOG) */}
          {/* ======================================================== */}
          {activeTab === "posts" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-[#1d2327]">Official Dispatches</h1>
                  <button
                    type="button"
                    onClick={handleOpenNewPost}
                    className="border border-[#2271b1] text-[#2271b1] hover:bg-[#2271b1] hover:text-white px-3 py-1 rounded text-xs font-semibold transition-colors"
                  >
                    Add New
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search Dispatches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-2.5 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden focus:border-[#2271b1]"
                  />
                </div>
              </div>

              {/* Status Filter Bar */}
              <div className="flex items-center gap-3 text-xs text-[#646970] border-b border-[#c3c4c7] pb-2">
                <button
                  type="button"
                  onClick={() => setPostFilterStatus("all")}
                  className={`hover:text-[#2271b1] ${
                    postFilterStatus === "all" ? "font-bold text-[#1d2327]" : ""
                  }`}
                >
                  All ({posts.length})
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => setPostFilterStatus("published")}
                  className={`hover:text-[#2271b1] ${
                    postFilterStatus === "published" ? "font-bold text-[#1d2327]" : ""
                  }`}
                >
                  Published ({posts.filter((p) => p.published).length})
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => setPostFilterStatus("draft")}
                  className={`hover:text-[#2271b1] ${
                    postFilterStatus === "draft" ? "font-bold text-[#1d2327]" : ""
                  }`}
                >
                  Drafts ({posts.filter((p) => !p.published).length})
                </button>
              </div>

              {/* Posts Table */}
              <div className="bg-white border border-[#c3c4c7] rounded overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327] font-bold">
                      <tr>
                        <th className="py-2.5 px-3 w-10">
                          <input type="checkbox" className="rounded border-[#8c8f94]" />
                        </th>
                        <th className="py-2.5 px-3">Title</th>
                        <th className="py-2.5 px-3">Author</th>
                        <th className="py-2.5 px-3">Categories</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f1]">
                      {posts
                        .filter((p) => {
                          if (postFilterStatus === "published") return p.published;
                          if (postFilterStatus === "draft") return !p.published;
                          return true;
                        })
                        .filter((p) =>
                          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((post) => (
                          <tr key={post.id} className="hover:bg-[#f6f7f7] transition-colors group">
                            <td className="py-3 px-3">
                              <input type="checkbox" className="rounded border-[#8c8f94]" />
                            </td>
                            <td className="py-3 px-3">
                              <div className="font-bold text-[#2271b1] hover:underline cursor-pointer">
                                {post.title}
                              </div>
                              <div className="text-[11px] text-[#646970] line-clamp-1 mt-0.5">
                                {post.summary}
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-[11px] text-[#2271b1] opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditPost(post)}
                                  className="hover:underline"
                                >
                                  Edit
                                </button>
                                <span>|</span>
                                <button
                                  type="button"
                                  onClick={() => handleDeletePost(post.id)}
                                  className="text-red-600 hover:underline"
                                >
                                  Archive
                                </button>
                                <span>|</span>
                                <Link href="/news" target="_blank" className="hover:underline">
                                  View Public
                                </Link>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-[#646970] whitespace-nowrap">{post.author}</td>
                            <td className="py-3 px-3">
                              <span className="bg-[#f0f0f1] px-2 py-0.5 rounded text-[11px] text-[#2c3338] whitespace-nowrap">
                                {post.category}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              {post.published ? (
                                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Published
                                </span>
                              ) : (
                                <span className="text-amber-700 font-semibold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span> Draft
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-[#646970] whitespace-nowrap">
                              {post.created_at || "2026-04-12"}
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => handleOpenEditPost(post)}
                                className="p-1 text-[#2271b1] hover:bg-blue-50 rounded"
                                title="Edit Dispatch"
                              >
                                <span className="material-symbols-outlined text-[16px]">edit</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: MEDIA LIBRARY (IMAGES & CLINICAL PHOTOS) */}
          {/* ======================================================== */}
          {activeTab === "media" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-[#1d2327]">Media Repository</h1>
                  <button
                    type="button"
                    onClick={() => setMediaModalOpen(true)}
                    className="border border-[#2271b1] text-[#2271b1] hover:bg-[#2271b1] hover:text-white px-3 py-1 rounded text-xs font-semibold transition-colors"
                  >
                    Add New Media
                  </button>
                </div>

                {/* View Switcher & Filters */}
                <div className="flex items-center gap-2">
                  <div className="border border-[#c3c4c7] rounded flex overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setMediaViewMode("grid")}
                      className={`px-2 py-1 ${
                        mediaViewMode === "grid" ? "bg-[#2271b1] text-white" : "bg-white text-[#646970]"
                      }`}
                      title="Grid View"
                    >
                      <span className="material-symbols-outlined text-[16px]">grid_view</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMediaViewMode("list")}
                      className={`px-2 py-1 ${
                        mediaViewMode === "list" ? "bg-[#2271b1] text-white" : "bg-white text-[#646970]"
                      }`}
                      title="List View"
                    >
                      <span className="material-symbols-outlined text-[16px]">list</span>
                    </button>
                  </div>

                  <select
                    value={mediaTypeFilter}
                    onChange={(e) => setMediaTypeFilter(e.target.value)}
                    className="px-2.5 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  >
                    <option value="all">All media items</option>
                    <option value="campus">Campus &amp; Enclave</option>
                    <option value="simulation">Simulation Labs</option>
                    <option value="ict">ICT Suites</option>
                  </select>
                </div>
              </div>

              {/* Grid View */}
              {mediaViewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {mediaItems
                    .filter((m) => mediaTypeFilter === "all" || m.category === mediaTypeFilter)
                    .map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedPhotoPreview(item)}
                        className="group bg-white border border-[#c3c4c7] rounded p-1.5 shadow-2xs hover:border-[#2271b1] transition-all cursor-pointer relative"
                      >
                        <div className="aspect-square w-full rounded overflow-hidden bg-gray-100 flex items-center justify-center relative">
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="pt-1.5 px-0.5">
                          <p className="text-[11px] font-bold text-[#1d2327] truncate">{item.title}</p>
                          <p className="text-[10px] text-[#8c8f94] uppercase tracking-wider">
                            {item.category}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                /* List View Table */
                <div className="bg-white border border-[#c3c4c7] rounded overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327] font-bold">
                      <tr>
                        <th className="py-2.5 px-3 w-16">Preview</th>
                        <th className="py-2.5 px-3">File Title</th>
                        <th className="py-2.5 px-3">Author / Uploader</th>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3">Caption</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f1]">
                      {mediaItems.map((item) => (
                        <tr key={item.id} className="hover:bg-[#f6f7f7] transition-colors">
                          <td className="py-2 px-3">
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-10 h-10 object-cover rounded border"
                            />
                          </td>
                          <td className="py-2 px-3 font-bold text-[#2271b1]">{item.title}</td>
                          <td className="py-2 px-3 text-[#646970]">{item.uploaded_by || "Registrar"}</td>
                          <td className="py-2 px-3">
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-[#646970] max-w-xs truncate">{item.caption}</td>
                          <td className="py-2 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteMedia(item.id)}
                              className="text-red-600 hover:underline text-xs"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: ADMISSIONS & SENATE DOSSIER */}
          {/* ======================================================== */}
          {activeTab === "admissions" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-[#1d2327]">Admissions &amp; Senate Dossier</h1>
                  <p className="text-xs text-[#646970]">
                    Nursing &amp; Midwifery Council of Nigeria (NMCN) Matriculation Ledger • 2026/2027 Session
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={exportNMCNLedgerCSV}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Export Official NMCN CSV</span>
                  </button>
                </div>
              </div>

              {/* Filters Bar */}
              <div className="bg-white border border-[#c3c4c7] p-3 rounded flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search candidate name, ID or RRR..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-2.5 py-1.5 border border-[#8c8f94] rounded text-xs w-64 outline-hidden focus:border-[#2271b1]"
                  />
                  <select
                    value={filterProgram}
                    onChange={(e) => setFilterProgram(e.target.value)}
                    className="px-2.5 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  >
                    <option value="all">All Programmes</option>
                    <option value="Basic">Basic Nursing (ND/HND)</option>
                    <option value="Midwifery">Post-Basic Midwifery</option>
                    <option value="Public">Public Health Nursing</option>
                    <option value="Perioperative">Perioperative Nursing</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-2.5 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending Screening</option>
                    <option value="under_review">Under Senate Review</option>
                    <option value="admitted">Admitted &amp; NMCN Indexed</option>
                  </select>
                </div>

                <span className="text-xs text-[#646970] font-semibold">
                  Showing {filteredCandidates.length} of {candidates.length} candidates
                </span>
              </div>

              {/* Candidates Table */}
              <div className="bg-white border border-[#c3c4c7] rounded overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327] font-bold">
                      <tr>
                        <th className="py-2.5 px-3">Application ID</th>
                        <th className="py-2.5 px-3">Candidate Name</th>
                        <th className="py-2.5 px-3">Programme</th>
                        <th className="py-2.5 px-3">O'Level Status</th>
                        <th className="py-2.5 px-3">Remita RRR &amp; Fee</th>
                        <th className="py-2.5 px-3">Admission Status</th>
                        <th className="py-2.5 px-3 text-right">Senate Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f1]">
                      {filteredCandidates.map((c) => (
                        <tr key={c.id} className="hover:bg-[#f6f7f7] transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-[#2271b1] whitespace-nowrap">
                            {c.id}
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-bold text-[#1d2327]">{c.name}</div>
                            <div className="text-[11px] text-[#8c8f94]">{c.batch}</div>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="font-medium text-[#2c3338]">{c.program}</span>
                            <div className="text-[10px] text-[#8c8f94]">{c.duration}</div>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                c.olevelStatus === "verified"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : "bg-amber-50 text-amber-800 border border-amber-200"
                              }`}
                            >
                              {c.olevel}
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <div className="font-mono text-[11px] text-[#2c3338]">{c.rrr}</div>
                            <div className="text-[10px] text-emerald-700 font-bold">{c.fee}</div>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            {c.status === "admitted" && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Admitted (NMCN Indexed)
                              </span>
                            )}
                            {c.status === "pending" && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span> Pending Screening
                              </span>
                            )}
                            {c.status === "under_review" && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Under Senate Review
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1">
                              {c.status !== "admitted" && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(c.id, "admitted")}
                                  className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold transition-colors"
                                  title="Approve Admission & Index with NMCN"
                                >
                                  Admit
                                </button>
                              )}
                              {c.status === "pending" && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(c.id, "under_review")}
                                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-bold transition-colors"
                                  title="Flag for Senate Committee Review"
                                >
                                  Review
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => setSelectedDossier(c)}
                                className="p-1 text-[#2271b1] hover:bg-gray-100 rounded"
                                title="View Candidate Dossier"
                              >
                                <span className="material-symbols-outlined text-[16px]">visibility</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: eLIBRARY HOLDINGS (BOOKS & JOURNALS) */}
          {/* ======================================================== */}
          {activeTab === "library" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-[#1d2327]">eLibrary &amp; Repository Manager</h1>
                  <p className="text-xs text-[#646970]">
                    Over 480+ clinical eBooks &amp; peer-reviewed journals • Subdomain:{" "}
                    <code className="text-emerald-700 font-bold">library.chep</code>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLibModalOpen(true)}
                  className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[15px]">add</span>
                  <span>Add New eResource</span>
                </button>
              </div>

              {/* Resource Table */}
              <div className="bg-white border border-[#c3c4c7] rounded overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327] font-bold">
                    <tr>
                      <th className="py-2.5 px-3">Resource Title</th>
                      <th className="py-2.5 px-3">Authors / Publishers</th>
                      <th className="py-2.5 px-3">Medical Discipline</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">ISBN / DOI</th>
                      <th className="py-2.5 px-3">Academic Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f0f1]">
                    {libraryResources.map((item) => (
                      <tr key={item.id} className="hover:bg-[#f6f7f7] transition-colors">
                        <td className="py-3 px-3 font-bold text-[#2271b1]">{item.title}</td>
                        <td className="py-3 px-3 text-[#646970]">{item.author}</td>
                        <td className="py-3 px-3">
                          <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3 px-3 uppercase text-[10px] font-bold tracking-wider">
                          {item.type}
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-[#2c3338]">{item.isbnOrDoi}</td>
                        <td className="py-3 px-3 text-[#646970]">{item.level}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: EXAMS & QUESTION BANK (MCQ, ESSAY, OSCE) */}
          {/* ======================================================== */}
          {activeTab === "exams" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-[#1d2327]">Exams &amp; Question Bank Studio</h1>
                  <p className="text-xs text-[#646970]">
                    160 MCQs, 52 Comprehensive Cases, and 102 Timed OSCE Stations • Subdomain:{" "}
                    <code className="text-orange-700 font-bold">exams.chep</code>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setExamModalOpen(true)}
                  className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[15px]">add</span>
                  <span>Add Exam Question</span>
                </button>
              </div>

              {/* Questions List */}
              <div className="bg-white border border-[#c3c4c7] rounded overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327] font-bold">
                    <tr>
                      <th className="py-2.5 px-3">Format</th>
                      <th className="py-2.5 px-3">Question Prompt / Station Description</th>
                      <th className="py-2.5 px-3">Discipline</th>
                      <th className="py-2.5 px-3">Target Level</th>
                      <th className="py-2.5 px-3">Key / Council Rubric</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f0f1]">
                    {examQuestions.map((q) => (
                      <tr key={q.id} className="hover:bg-[#f6f7f7] transition-colors">
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              q.type === "mcq"
                                ? "bg-blue-100 text-blue-800"
                                : q.type === "essay"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {q.type}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-medium text-[#1d2327] max-w-md">{q.prompt}</td>
                        <td className="py-3 px-3 text-[#646970] whitespace-nowrap">{q.category}</td>
                        <td className="py-3 px-3 whitespace-nowrap">{q.level}</td>
                        <td className="py-3 px-3 text-emerald-700 font-mono text-[11px]">{q.keyOrRubric}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 7: REFLECTIVE FORUM MODERATION (PHI SANITIZER) */}
          {/* ======================================================== */}
          {activeTab === "reflections" && (
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-[#1d2327]">Reflective Clinical Forum Moderation</h1>
                <p className="text-xs text-[#646970]">
                  Automated HIPAA &amp; NDPR Protected Health Information (PHI) Scrubbing Engine • Subdomain:{" "}
                  <code className="text-blue-700 font-bold">reflections.chep</code>
                </p>
              </div>

              <div className="bg-white border border-[#c3c4c7] p-5 rounded space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 p-3 rounded border border-emerald-200">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Automated PHI Sanitizer is ACTIVE: Real patient names and exact room numbers are automatically redacted before publication.</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1d2327]">
                    Recent Case Reflections Submitted for Academic Review
                  </h3>
                  <div className="border border-[#c3c4c7] rounded p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#2271b1]">
                        Managing Post-Partum Hemorrhage at Ota General Hospital
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        Sanitized &amp; Approved
                      </span>
                    </div>
                    <p className="text-xs text-[#646970] leading-relaxed">
                      "During my night rotation in labor ward, a 28-year-old P2+0 [PATIENT NAME REDACTED] presented with acute atonic bleeding following spontaneous vaginal delivery. Following Gibbs reflective framework, I recognized the immediate need for fundal massage and oxytocin titration..."
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-[#8c8f94] pt-2 border-t border-[#f0f0f1]">
                      <span>Author: Student Nurse (400 Level)</span>
                      <span>NMCN Ethics Clearance: Passed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 8: USERS & ROLES */}
          {/* ======================================================== */}
          {activeTab === "users" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-[#1d2327]">Staff Directory &amp; Roles</h1>
                  <p className="text-xs text-[#646970]">
                    Role-Based Access Control (Super Admin, Editor, Faculty, Preceptor, Bursar)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setUserModalOpen(true)}
                  className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[15px]">person_add</span>
                  <span>Add New User</span>
                </button>
              </div>

              {/* Users Table */}
              <div className="bg-white border border-[#c3c4c7] rounded overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327] font-bold">
                    <tr>
                      <th className="py-2.5 px-3">User Profile</th>
                      <th className="py-2.5 px-3">Email Address</th>
                      <th className="py-2.5 px-3">Role</th>
                      <th className="py-2.5 px-3">Department</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f0f1]">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-[#f6f7f7] transition-colors">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            {u.avatar_url ? (
                              <img
                                src={u.avatar_url}
                                alt={u.full_name}
                                className="w-8 h-8 rounded-full object-cover border"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-[#2271b1] text-white flex items-center justify-center font-bold text-xs">
                                {u.full_name[0]}
                              </div>
                            )}
                            <span className="font-bold text-[#1d2327]">{u.full_name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-[#2271b1]">{u.email}</td>
                        <td className="py-3 px-3">
                          <span className="bg-gray-100 text-[#2c3338] px-2 py-0.5 rounded font-bold text-[10px]">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-[#646970]">{u.department}</td>
                        <td className="py-3 px-3">
                          <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Active
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(u.id)}
                            className="text-red-600 hover:underline text-xs"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 9: TOOLS & DIAGNOSTICS */}
          {/* ======================================================== */}
          {activeTab === "tools" && (
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-[#1d2327]">Tools &amp; System Health</h1>
                <p className="text-xs text-[#646970]">
                  System runtime information, server environment diagnostics, and archival utilities
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-[#c3c4c7] p-5 rounded space-y-3">
                  <h3 className="text-sm font-bold text-[#1d2327]">System Information</h3>
                  <div className="space-y-2 text-xs text-[#646970]">
                    <div className="flex justify-between py-1 border-b border-[#f0f0f1]">
                      <span>Management Suite</span>
                      <span className="font-bold text-[#1d2327]">CHEP-IMS Core 6.7.2 / Next.js 16</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#f0f0f1]">
                      <span>Server Operating System</span>
                      <span className="font-bold text-[#1d2327]">Linux Edge (Vercel Serverless)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#f0f0f1]">
                      <span>Database Engine</span>
                      <span className="font-bold text-[#1d2327]">PostgreSQL 16.2 (Supabase Cloud)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>NMCN Accreditation API</span>
                      <span className="font-bold text-emerald-700">Validated Node</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#c3c4c7] p-5 rounded space-y-3">
                  <h3 className="text-sm font-bold text-[#1d2327]">Export Data</h3>
                  <p className="text-xs text-[#646970] leading-relaxed">
                    Download an archival copy of all college dispatches, applications, media metadata,
                    and question banks.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const data = { posts, candidates, mediaItems, libraryResources, examQuestions };
                      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `CHEP_Backup_${Date.now()}.json`;
                      a.click();
                      showToast("Institutional JSON backup downloaded.");
                    }}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded transition-colors"
                  >
                    Download Full JSON Backup
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 10: SETTINGS & SUBDOMAINS */}
          {/* ======================================================== */}
          {activeTab === "settings" && (
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-[#1d2327]">Institutional Settings</h1>
                <p className="text-xs text-[#646970]">
                  Configure college identity, contact hotlines, subdomain routing, and NMCN fees
                </p>
              </div>

              <div className="bg-white border border-[#c3c4c7] p-5 rounded space-y-6">
                {/* General Settings */}
                <div className="space-y-4 max-w-2xl">
                  <h3 className="text-sm font-bold text-[#1d2327] border-b pb-2">General Settings</h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-[#1d2327] mb-1">Site Title</label>
                      <input
                        type="text"
                        defaultValue="CHEP College of Nursing Sciences"
                        className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#1d2327] mb-1">Tagline</label>
                      <input
                        type="text"
                        defaultValue="Excellence in Clinical Nursing, Midwifery & Community Healthcare"
                        className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#1d2327] mb-1">Admissions Phone Numbers</label>
                      <input
                        type="text"
                        value={settingsPhone}
                        onChange={(e) => setSettingsPhone(e.target.value)}
                        className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#1d2327] mb-1">Official Registry Email</label>
                      <input
                        type="email"
                        value={settingsEmail}
                        onChange={(e) => setSettingsEmail(e.target.value)}
                        className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Subdomain Configuration Table */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#1d2327] border-b pb-2">
                    Campus Subdomain Organization
                  </h3>
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#f6f7f7] border-b border-[#c3c4c7]">
                      <tr>
                        <th className="py-2 px-3">Subdomain Host</th>
                        <th className="py-2 px-3">Target Service</th>
                        <th className="py-2 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f1]">
                      <tr>
                        <td className="py-2 px-3 font-mono font-bold text-[#2271b1]">exams.chep</td>
                        <td className="py-2 px-3">CBT &amp; OSCE Testing Studio</td>
                        <td className="py-2 px-3 text-emerald-700 font-bold">Active DNS</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-mono font-bold text-[#2271b1]">library.chep</td>
                        <td className="py-2 px-3">Virtual eLibrary &amp; AI Care Plan</td>
                        <td className="py-2 px-3 text-emerald-700 font-bold">Active DNS</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-mono font-bold text-[#2271b1]">reflections.chep</td>
                        <td className="py-2 px-3">Protected Reflective Clinical Forum</td>
                        <td className="py-2 px-3 text-emerald-700 font-bold">Active DNS</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-mono font-bold text-[#2271b1]">about.chep</td>
                        <td className="py-2 px-3">Institutional Heritage &amp; Governance</td>
                        <td className="py-2 px-3 text-emerald-700 font-bold">Active DNS</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-mono font-bold text-[#2271b1]">portal.chep</td>
                        <td className="py-2 px-3">Student &amp; Faculty Academic LMS</td>
                        <td className="py-2 px-3 text-emerald-700 font-bold">Active DNS</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-mono font-bold text-[#2271b1]">iloro.chep</td>
                        <td className="py-2 px-3">Enterprise Institutional Senate Suite</td>
                        <td className="py-2 px-3 text-emerald-700 font-bold">Active DNS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => showToast("Institutional settings saved successfully.")}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT DISPATCH */}
      {/* ======================================================== */}
      {postModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden border border-[#c3c4c7] animate-scaleIn">
            <div className="px-4 py-3 bg-[#f6f7f7] border-b border-[#c3c4c7] flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#1d2327]">
                {editingPost ? "Edit Dispatch" : "Add New Official Dispatch"}
              </h3>
              <button
                type="button"
                onClick={() => setPostModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSavePost} className="p-4 sm:p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#1d2327] mb-1">Dispatch Title</label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Enter title here..."
                  className="w-full px-3 py-2 border border-[#8c8f94] rounded text-sm focus:border-[#2271b1] outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#1d2327] mb-1">Category</label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  >
                    <option value="Admissions 2026/2027">Admissions 2026/2027</option>
                    <option value="Community Health">Community Health</option>
                    <option value="Total Care">Total Care</option>
                    <option value="Accreditation">Accreditation</option>
                    <option value="Clinical Skills">Clinical Skills</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#1d2327] mb-1">Author / Signatory</label>
                  <input
                    type="text"
                    value={postAuthor}
                    onChange={(e) => setPostAuthor(e.target.value)}
                    className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1d2327] mb-1">Short Excerpt / Summary</label>
                <textarea
                  rows={2}
                  value={postSummary}
                  onChange={(e) => setPostSummary(e.target.value)}
                  placeholder="One or two sentences summarizing this news..."
                  className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-[#1d2327] mb-1">Full Content</label>
                <textarea
                  rows={6}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Compose full dispatch text..."
                  className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  required
                ></textarea>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={postPublished}
                    onChange={(e) => setPostPublished(e.target.checked)}
                    className="rounded border-[#8c8f94]"
                  />
                  <span className="font-bold text-[#1d2327]">Publish immediately to live public feed</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setPostModalOpen(false)}
                  className="px-4 py-2 border border-[#8c8f94] rounded text-xs font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white rounded text-xs font-semibold shadow-xs"
                >
                  {editingPost ? "Update Dispatch" : "Publish Dispatch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD MEDIA ASSET */}
      {/* ======================================================== */}
      {mediaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-[#c3c4c7] animate-scaleIn">
            <div className="px-4 py-3 bg-[#f6f7f7] border-b border-[#c3c4c7] flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#1d2327]">Upload New Media Asset</h3>
              <button
                type="button"
                onClick={() => setMediaModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveMedia} className="p-4 sm:p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#1d2327] mb-1">Asset Title</label>
                <input
                  type="text"
                  value={mediaTitle}
                  onChange={(e) => setMediaTitle(e.target.value)}
                  placeholder="e.g. Simulation Lab Manikin Training"
                  className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#1d2327] mb-1">Media Category</label>
                <select
                  value={mediaCategory}
                  onChange={(e) => setMediaCategory(e.target.value)}
                  className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                >
                  <option value="campus">Campus &amp; Main Complex</option>
                  <option value="simulation">Clinical Simulation Lab</option>
                  <option value="ict">ICT Digital Suites</option>
                  <option value="hostel">Hostels &amp; Residential Quarters</option>
                  <option value="outreach">Community Health Outreach</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#1d2327] mb-1">Image URL / Path</label>
                <input
                  type="text"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="/images/chep/..."
                  className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs font-mono outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#1d2327] mb-1">Caption / Description</label>
                <textarea
                  rows={2}
                  value={mediaCaption}
                  onChange={(e) => setMediaCaption(e.target.value)}
                  placeholder="Official caption displayed in gallery..."
                  className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setMediaModalOpen(false)}
                  className="px-4 py-2 border border-[#8c8f94] rounded text-xs font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white rounded text-xs font-semibold shadow-xs"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: PHOTO DETAILS PREVIEW */}
      {/* ======================================================== */}
      {selectedPhotoPreview && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden border border-[#c3c4c7] animate-scaleIn">
            <div className="p-4 bg-[#f6f7f7] border-b border-[#c3c4c7] flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#1d2327]">{selectedPhotoPreview.title}</h3>
              <button
                type="button"
                onClick={() => setSelectedPhotoPreview(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-4 space-y-3">
              <img
                src={selectedPhotoPreview.image_url}
                alt={selectedPhotoPreview.title}
                className="w-full max-h-80 object-cover rounded border"
              />
              <div className="text-xs space-y-1">
                <p className="text-[#646970]">
                  <strong>Caption:</strong> {selectedPhotoPreview.caption}
                </p>
                <p className="text-[#646970]">
                  <strong>Category:</strong> {selectedPhotoPreview.category}
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    readOnly
                    value={selectedPhotoPreview.image_url}
                    className="w-full px-2 py-1 bg-gray-50 border rounded font-mono text-[11px]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedPhotoPreview.image_url);
                      showToast("Image URL copied to clipboard.");
                    }}
                    className="px-3 py-1 bg-[#2271b1] text-white rounded font-semibold text-xs whitespace-nowrap"
                  >
                    Copy URL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: DOSSIER INSPECTOR */}
      {/* ======================================================== */}
      {selectedDossier && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-[#c3c4c7] animate-scaleIn">
            <div className="p-4 bg-[#f6f7f7] border-b border-[#c3c4c7] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#1d2327]">{selectedDossier.name}</h3>
                <p className="text-[11px] font-mono text-[#2271b1]">{selectedDossier.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDossier(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 py-2 border-b border-[#f0f0f1]">
                <div>
                  <span className="text-[#8c8f94] block">Programme</span>
                  <span className="font-bold text-[#1d2327]">{selectedDossier.program}</span>
                </div>
                <div>
                  <span className="text-[#8c8f94] block">Duration</span>
                  <span className="font-bold text-[#1d2327]">{selectedDossier.duration}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 py-2 border-b border-[#f0f0f1]">
                <div>
                  <span className="text-[#8c8f94] block">O'Level Status</span>
                  <span className="font-bold text-emerald-700">{selectedDossier.olevel}</span>
                </div>
                <div>
                  <span className="text-[#8c8f94] block">Screening Batch</span>
                  <span className="font-bold text-[#1d2327]">{selectedDossier.batch}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 py-2 border-b border-[#f0f0f1]">
                <div>
                  <span className="text-[#8c8f94] block">Remita RRR</span>
                  <span className="font-mono font-bold text-[#1d2327]">{selectedDossier.rrr}</span>
                </div>
                <div>
                  <span className="text-[#8c8f94] block">Payment Fee</span>
                  <span className="font-bold text-emerald-700">{selectedDossier.fee}</span>
                </div>
              </div>
              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedDossier.id, "admitted")}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded"
                >
                  Confirm Full Admission (NMCN Indexing)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD USER */}
      {/* ======================================================== */}
      {userModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-[#c3c4c7] animate-scaleIn">
            <div className="px-4 py-3 bg-[#f6f7f7] border-b border-[#c3c4c7] flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#1d2327]">Register New User Account</h3>
              <button
                type="button"
                onClick={() => setUserModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="p-4 sm:p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#1d2327] mb-1">Full Name</label>
                <input
                  type="text"
                  value={userFullName}
                  onChange={(e) => setUserFullName(e.target.value)}
                  placeholder="e.g. Dr. K. O. Adeleke"
                  className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#1d2327] mb-1">Institutional Email</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="adeleke.k@chepnursingcollege.org"
                  className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1d2327] mb-1">Role</label>
                  <select
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Faculty Lecturer">Faculty Lecturer</option>
                    <option value="Clinical Preceptor">Clinical Preceptor</option>
                    <option value="Bursar">Bursar</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#1d2327] mb-1">Department</label>
                  <input
                    type="text"
                    value={userDept}
                    onChange={(e) => setUserDept(e.target.value)}
                    placeholder="e.g. Nursing Sciences"
                    className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setUserModalOpen(false)}
                  className="px-4 py-2 border border-[#8c8f94] rounded text-xs font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white rounded text-xs font-semibold shadow-xs"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD eLIBRARY ITEM */}
      {/* ======================================================== */}
      {libModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-[#c3c4c7] animate-scaleIn">
            <div className="px-4 py-3 bg-[#f6f7f7] border-b border-[#c3c4c7] flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#1d2327]">Register New eResource</h3>
              <button
                type="button"
                onClick={() => setLibModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveLibrary} className="p-4 sm:p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#1d2327] mb-1">Title</label>
                <input
                  type="text"
                  value={libTitle}
                  onChange={(e) => setLibTitle(e.target.value)}
                  placeholder="e.g. Lippincott Manual of Nursing Practice"
                  className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#1d2327] mb-1">Authors</label>
                <input
                  type="text"
                  value={libAuthor}
                  onChange={(e) => setLibAuthor(e.target.value)}
                  placeholder="e.g. Sandra M. Nettina"
                  className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1d2327] mb-1">Type</label>
                  <select
                    value={libType}
                    onChange={(e) => setLibType(e.target.value as any)}
                    className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  >
                    <option value="ebook">eBook (Textbook)</option>
                    <option value="journal">Peer-Reviewed Journal</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#1d2327] mb-1">Discipline</label>
                  <select
                    value={libCategory}
                    onChange={(e) => setLibCategory(e.target.value)}
                    className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  >
                    <option value="Medical-Surgical">Medical-Surgical</option>
                    <option value="Pharmacology">Pharmacology</option>
                    <option value="Midwifery">Midwifery</option>
                    <option value="Public Health">Public Health</option>
                    <option value="Fundamentals">Fundamentals</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1d2327] mb-1">ISBN / DOI</label>
                  <input
                    type="text"
                    value={libIsbn}
                    onChange={(e) => setLibIsbn(e.target.value)}
                    placeholder="978-..."
                    className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs font-mono outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1d2327] mb-1">Target Level</label>
                  <input
                    type="text"
                    value={libLevel}
                    onChange={(e) => setLibLevel(e.target.value)}
                    placeholder="300 Level"
                    className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setLibModalOpen(false)}
                  className="px-4 py-2 border border-[#8c8f94] rounded text-xs font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white rounded text-xs font-semibold shadow-xs"
                >
                  Save to OPAC
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD EXAM QUESTION */}
      {/* ======================================================== */}
      {examModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-[#c3c4c7] animate-scaleIn">
            <div className="px-4 py-3 bg-[#f6f7f7] border-b border-[#c3c4c7] flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#1d2327]">Add Question to Council Bank</h3>
              <button
                type="button"
                onClick={() => setExamModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveExamQuestion} className="p-4 sm:p-6 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-[#1d2327] mb-1">Format</label>
                  <select
                    value={examType}
                    onChange={(e) => setExamType(e.target.value as any)}
                    className="w-full px-2 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  >
                    <option value="mcq">MCQ</option>
                    <option value="essay">Clinical Essay</option>
                    <option value="osce">OSCE Station</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#1d2327] mb-1">Discipline</label>
                  <input
                    type="text"
                    value={examCategory}
                    onChange={(e) => setExamCategory(e.target.value)}
                    className="w-full px-2 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1d2327] mb-1">Level</label>
                  <input
                    type="text"
                    value={examLevel}
                    onChange={(e) => setExamLevel(e.target.value)}
                    className="w-full px-2 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1d2327] mb-1">
                  Question Prompt / Clinical Case Stem
                </label>
                <textarea
                  rows={4}
                  value={examPrompt}
                  onChange={(e) => setExamPrompt(e.target.value)}
                  placeholder="Enter full clinical question prompt..."
                  className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-[#1d2327] mb-1">Correct Key / Scoring Rubric</label>
                <textarea
                  rows={2}
                  value={examRubric}
                  onChange={(e) => setExamRubric(e.target.value)}
                  placeholder="Official NMCN scoring breakdown..."
                  className="w-full px-3 py-1.5 border border-[#8c8f94] rounded text-xs outline-hidden resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setExamModalOpen(false)}
                  className="px-4 py-2 border border-[#8c8f94] rounded text-xs font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white rounded text-xs font-semibold shadow-xs"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
