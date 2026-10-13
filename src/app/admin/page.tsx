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

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "admissions" | "blog" | "media" | "users" | "settings"
  >("overview");

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

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
  ]);
  const [selectedDossier, setSelectedDossier] = useState<Candidate | null>(null);

  // 2. Blog Posts State
  const [posts, setPosts] = useState<PostItem[]>([
    {
      id: "seed-1",
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
      id: "seed-2",
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
      id: "seed-3",
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
      role: "Lecturer / Faculty",
      department: "Nursing Sciences",
      status: "active",
      avatar_url: "/images/chep/lecturer_akinkuebi.png",
    },
    {
      id: "u-3",
      full_name: "Jojolade Adeboye Ismail",
      email: "jojolade.a@chepnursingcollege.org",
      role: "Lecturer / Faculty",
      department: "Clinical Preceptorship",
      status: "active",
      avatar_url: "/images/chep/lecturer_jojolade.png",
    },
    {
      id: "u-4",
      full_name: "Mr. Samuel E. Akinro",
      email: "registrar@chepnursingcollege.org",
      role: "Editor",
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

  // 5. Site Settings State
  const [settingsNotice, setSettingsNotice] = useState(
    "2026/2027 Professional Basic Nursing Screening Dates Announced by NMCN Accredited Board. CBT screening is active at Ota Main Campus."
  );
  const [settingsPhone, setSettingsPhone] = useState("+234 916 635 674, +234 813 540 6714");
  const [settingsEmail, setSettingsEmail] = useState("enquiries@chepnursingcollege.org");
  const [settingsBasicFee, setSettingsBasicFee] = useState("15,000");
  const [settingsMidwiferyFee, setSettingsMidwiferyFee] = useState("20,000");
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Load from Supabase on mount
  useEffect(() => {
    async function loadData() {
      // 1. Applications
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

      // 2. Dispatches
      const postRes = await getNewsDispatches();
      if (postRes.success && postRes.data && postRes.data.length > 0) {
        setPosts(postRes.data);
      }

      // 3. Site Users
      const userRes = await getSiteUsers();
      if (userRes.success && userRes.data && userRes.data.length > 0) {
        setUsers(userRes.data);
      }

      // 4. Media Gallery
      const mediaRes = await getMediaGallery();
      if (mediaRes.success && mediaRes.data && mediaRes.data.length > 0) {
        setMediaItems(mediaRes.data);
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
  };

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.rrr.includes(searchTerm);
    const matchesProgram =
      filterProgram === "all" || c.program.toLowerCase().includes(filterProgram.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesProgram && matchesStatus;
  });

  // ----------------------------------------------------
  // Blog / News Handlers
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
      // Update
      const updated = {
        title: postTitle,
        category: postCategory,
        author: postAuthor,
        summary: postSummary,
        content: postContent,
        image_url: postImage,
        published: postPublished,
      };
      setPosts((prev) =>
        prev.map((p) => (p.id === editingPost.id ? { ...p, ...updated } : p))
      );
      await updateDispatch(editingPost.id, updated);
      alert("Post updated successfully!");
    } else {
      // Create New
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
        created_at: new Date().toISOString(),
      };
      setPosts((prev) => [newPost, ...prev]);
      await publishDispatch(newPost);
      alert("New post published successfully!");
    }

    setPostModalOpen(false);
  };

  const handleDeletePost = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete post "${title}"?`)) return;
    setPosts((prev) => prev.filter((p) => p.id !== id));
    await deleteDispatch(id);
  };

  // ----------------------------------------------------
  // Media Gallery Handlers
  // ----------------------------------------------------
  const handleSaveMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaTitle || !mediaUrl) return;

    const newItem: MediaPhotoItem = {
      id: `media-${Date.now()}`,
      title: mediaTitle,
      category: mediaCategory,
      image_url: mediaUrl,
      caption: mediaCaption || mediaTitle,
      uploaded_by: "Registrar / Admin",
    };

    setMediaItems((prev) => [newItem, ...prev]);
    await addMediaPhoto(newItem);
    alert("Photograph added to gallery!");
    setMediaModalOpen(false);
    setMediaTitle("");
    setMediaCaption("");
  };

  const handleDeleteMedia = async (id: string, title: string) => {
    if (!confirm(`Delete photograph "${title}"?`)) return;
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
    await deleteMediaPhoto(id);
  };

  // ----------------------------------------------------
  // Users & Staff Handlers
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

    setUsers((prev) => [newUser, ...prev]);
    await createSiteUser(newUser);
    alert(`Staff account for ${userFullName} created successfully!`);
    setUserModalOpen(false);
    setUserFullName("");
    setUserEmail("");
  };

  const handleToggleUserStatus = async (user: SiteUserItem) => {
    const nextStatus = user.status === "active" ? "suspended" : "active";
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u))
    );
    await updateSiteUser(user.id, { status: nextStatus });
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (!confirm(`Permanently remove staff account for "${name}"?`)) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
    await deleteSiteUser(id);
  };

  // ----------------------------------------------------
  // Settings Handlers
  // ----------------------------------------------------
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3000);
  };

  return (
    <>
      <Navbar />

      <main className="w-full pt-20 bg-surface-canvas min-h-screen">
        {/* Top Institutional Status Bar */}
        <section className="w-full bg-forest-dark text-white py-3 px-4 sm:px-8 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 bg-forest-base/60 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary-fixed">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-accent animate-pulse"></span>
                WordPress-Style CMS Portal • Session 2026/2027
              </span>
              <span className="text-xs text-gray-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary-fixed">verified_user</span>
                NMCN Node Ogun-OTA-041 Validated
              </span>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto justify-end">
              <div className="flex items-center gap-2 bg-white/10 pl-2 pr-3 py-1 rounded-full text-xs">
                <img
                  src="/images/chep/provost.png"
                  alt="Provost"
                  className="w-6 h-6 rounded-full object-cover bg-forest-medium"
                />
                <span className="font-semibold text-white hidden sm:inline">
                  Stella O. Ayowole (Provost &amp; Super Admin)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Dashboard Layout */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            {/* Left WordPress-Style Admin Sidebar */}
            <aside className="xl:col-span-3 bg-white rounded-3xl shadow-xs border border-border-subtle p-5 space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-forest-medium block">
                  Institutional CMS Suite
                </span>
                <h2 className="text-lg font-bold text-forest-dark">College Administrator</h2>
              </div>

              {/* Navigation Menu Tabs */}
              <nav className="space-y-1.5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                    activeTab === "overview"
                      ? "bg-forest-base text-white shadow-xs font-bold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px]">dashboard</span>
                    Dashboard Overview
                  </span>
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("admissions")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                    activeTab === "admissions"
                      ? "bg-forest-base text-white shadow-xs font-bold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                    Admissions &amp; Senate Ledger
                  </span>
                  <span className="bg-orange-100 text-orange-action px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {candidates.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("blog")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                    activeTab === "blog"
                      ? "bg-forest-base text-white shadow-xs font-bold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px]">article</span>
                    Blog &amp; News Posts
                  </span>
                  <span className="bg-emerald-100 text-emerald-accent px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {posts.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("media")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                    activeTab === "media"
                      ? "bg-forest-base text-white shadow-xs font-bold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px]">photo_library</span>
                    Photographs &amp; Media
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {mediaItems.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("users")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                    activeTab === "users"
                      ? "bg-forest-base text-white shadow-xs font-bold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px]">group</span>
                    Staff &amp; Users Manager
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {users.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                    activeTab === "settings"
                      ? "bg-forest-base text-white shadow-xs font-bold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px]">settings</span>
                    Site Settings &amp; Fees
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-accent"></span>
                </button>
              </nav>

              {/* Server & Status Note */}
              <div className="bg-surface-tint p-4 rounded-2xl border border-emerald-100 space-y-1">
                <span className="text-xs font-bold text-forest-dark flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-forest-base">cloud_done</span>
                  Supabase Backend Live
                </span>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Remote database sync active at hoqhcwrsjoglqhtjfeqa.supabase.co.
                </p>
              </div>
            </aside>

            {/* Main Content Viewport */}
            <div className="xl:col-span-9 space-y-8">
              {/* ========================================================= */}
              {/* TAB 1: OVERVIEW */}
              {/* ========================================================= */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-bold text-text-muted">Applications</span>
                        <span className="material-symbols-outlined text-orange-action text-[20px]">how_to_reg</span>
                      </div>
                      <div className="my-2">
                        <span className="text-3xl font-extrabold text-gray-900">{candidates.length}</span>
                        <span className="text-xs text-emerald-accent font-bold block mt-1">+24.6% vs 2024</span>
                      </div>
                      <span className="text-[11px] text-text-muted">Verified Remita RRR cleared</span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-bold text-text-muted">Blog Articles</span>
                        <span className="material-symbols-outlined text-forest-base text-[20px]">article</span>
                      </div>
                      <div className="my-2">
                        <span className="text-3xl font-extrabold text-forest-dark">{posts.length}</span>
                        <span className="text-xs text-forest-medium font-bold block mt-1">Live on Website</span>
                      </div>
                      <span className="text-[11px] text-text-muted">Research &amp; announcements</span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-bold text-text-muted">Campus Photos</span>
                        <span className="material-symbols-outlined text-blue-600 text-[20px]">photo_library</span>
                      </div>
                      <div className="my-2">
                        <span className="text-3xl font-extrabold text-gray-900">{mediaItems.length}</span>
                        <span className="text-xs text-emerald-accent font-bold block mt-1">Authentic Media</span>
                      </div>
                      <span className="text-[11px] text-text-muted">Laboratories, hostels, CBT</span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-xs border border-border-subtle flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-bold text-text-muted">System Staff</span>
                        <span className="material-symbols-outlined text-purple-600 text-[20px]">group</span>
                      </div>
                      <div className="my-2">
                        <span className="text-3xl font-extrabold text-gray-900">{users.length}</span>
                        <span className="text-xs text-purple-700 font-bold block mt-1">Active Accounts</span>
                      </div>
                      <span className="text-[11px] text-text-muted">Provost, Registrar, Lecturers</span>
                    </div>
                  </div>

                  {/* Fast Action Shortcuts */}
                  <div className="bg-white p-6 rounded-3xl shadow-xs border border-border-subtle">
                    <h3 className="text-base font-bold text-forest-dark mb-4">WordPress CMS Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <button
                        onClick={() => {
                          setActiveTab("blog");
                          handleOpenNewPost();
                        }}
                        className="p-4 rounded-2xl border border-gray-200 hover:border-forest-base hover:bg-forest-base/5 text-left transition-all flex flex-col justify-between group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-action flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-[20px]">edit_note</span>
                        </div>
                        <span className="font-bold text-xs text-gray-900 group-hover:text-forest-dark block">
                          Add New Blog Post
                        </span>
                        <span className="text-[11px] text-text-muted">Publish research or institutional memos</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab("media");
                          setMediaModalOpen(true);
                        }}
                        className="p-4 rounded-2xl border border-gray-200 hover:border-forest-base hover:bg-forest-base/5 text-left transition-all flex flex-col justify-between group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                        </div>
                        <span className="font-bold text-xs text-gray-900 group-hover:text-forest-dark block">
                          Add Photo to Gallery
                        </span>
                        <span className="text-[11px] text-text-muted">Upload laboratory or event pictures</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab("users");
                          setUserModalOpen(true);
                        }}
                        className="p-4 rounded-2xl border border-gray-200 hover:border-forest-base hover:bg-forest-base/5 text-left transition-all flex flex-col justify-between group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-[20px]">person_add</span>
                        </div>
                        <span className="font-bold text-xs text-gray-900 group-hover:text-forest-dark block">
                          Create Staff User
                        </span>
                        <span className="text-[11px] text-text-muted">Assign role to academic lecturers</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab("admissions");
                        }}
                        className="p-4 rounded-2xl border border-gray-200 hover:border-forest-base hover:bg-forest-base/5 text-left transition-all flex flex-col justify-between group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-accent flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-[20px]">file_download</span>
                        </div>
                        <span className="font-bold text-xs text-gray-900 group-hover:text-forest-dark block">
                          Export NMCN CSV
                        </span>
                        <span className="text-[11px] text-text-muted">Download official Council ledger</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 2: ADMISSIONS & SENATE LEDGER */}
              {/* ========================================================= */}
              {activeTab === "admissions" && (
                <div className="bg-white rounded-3xl shadow-xs border border-border-subtle overflow-hidden">
                  <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-forest-dark">2026/2027 Admissions Queue</h3>
                        <span className="bg-orange-100 text-orange-action text-xs font-bold px-2 py-0.5 rounded-full">
                          {filteredCandidates.length} Active
                        </span>
                      </div>
                      <p className="text-xs text-text-muted">Candidates with verified CBT scores and Remita clearance.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        value={filterProgram}
                        onChange={(e) => setFilterProgram(e.target.value)}
                        className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 bg-surface-canvas focus:outline-hidden"
                      >
                        <option value="all">All Programmes</option>
                        <option value="basic">Basic Nursing</option>
                        <option value="midwifery">Post-Basic Midwifery</option>
                        <option value="public">Public Health Nursing</option>
                      </select>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 bg-surface-canvas focus:outline-hidden"
                      >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="admitted">Admitted</option>
                      </select>
                      <button
                        onClick={exportNMCNLedgerCSV}
                        className="bg-forest-base text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-forest-medium transition-colors shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[16px]">file_download</span>
                        Export NMCN CSV ({filteredCandidates.length})
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-surface-canvas text-gray-600 uppercase tracking-wider font-bold">
                        <tr>
                          <th className="py-3 px-4">Candidate &amp; ID</th>
                          <th className="py-3 px-4">Programme</th>
                          <th className="py-3 px-4">O&apos;Level Status</th>
                          <th className="py-3 px-4">Remita Status</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredCandidates.map((cand) => (
                          <tr key={cand.id} className="hover:bg-gray-50/60 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-forest-base/10 text-forest-base font-bold flex items-center justify-center text-xs">
                                  {cand.initials}
                                </div>
                                <div>
                                  <span className="font-bold text-gray-900 block">{cand.name}</span>
                                  <span className="text-[11px] text-text-muted">{cand.id}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-forest-dark block">{cand.program}</span>
                              <span className="text-[11px] text-text-muted">{cand.duration}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                  cand.olevelStatus === "verified"
                                    ? "bg-emerald-light text-emerald-accent"
                                    : "bg-amber-100 text-amber-vibrant"
                                }`}
                              >
                                <span className="material-symbols-outlined text-[14px]">
                                  {cand.olevelStatus === "verified" ? "check" : "pending"}
                                </span>
                                {cand.olevel}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-mono text-[11px] text-gray-800 block">{cand.rrr}</span>
                              <span className="text-emerald-accent font-semibold text-[11px]">{cand.fee}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  cand.status === "admitted"
                                    ? "bg-emerald-500 text-white"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {cand.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleStatusChange(cand.id, cand.status === "admitted" ? "pending" : "admitted")}
                                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                                    cand.status === "admitted"
                                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                      : "bg-forest-base hover:bg-forest-medium text-white shadow-xs"
                                  }`}
                                >
                                  {cand.status === "admitted" ? "Revoke" : "Admit"}
                                </button>
                                <button
                                  onClick={() => setSelectedDossier(cand)}
                                  className="bg-primary-fixed/20 hover:bg-primary-fixed/40 text-forest-dark px-2.5 py-1 rounded text-[11px] font-bold transition-colors flex items-center gap-1"
                                >
                                  <span className="material-symbols-outlined text-[14px]">badge</span>
                                  Dossier
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 3: BLOG & NEWS POSTS (FULL CRUD) */}
              {/* ========================================================= */}
              {activeTab === "blog" && (
                <div className="bg-white rounded-3xl shadow-xs border border-border-subtle overflow-hidden">
                  <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-lg font-bold text-forest-dark">WordPress Blog &amp; News Manager</h3>
                      <p className="text-xs text-text-muted">Create, edit, delete, and publish articles live on the website.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleOpenNewPost}
                      className="bg-orange-action hover:bg-orange-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      Add New Post
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-surface-canvas text-gray-600 uppercase tracking-wider font-bold">
                        <tr>
                          <th className="py-3 px-4">Post Title &amp; Category</th>
                          <th className="py-3 px-4">Author</th>
                          <th className="py-3 px-4">Image</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {posts.map((post) => (
                          <tr key={post.id} className="hover:bg-gray-50/60 transition-colors">
                            <td className="py-3.5 px-4 max-w-xs">
                              <span className="font-bold text-gray-900 block truncate">{post.title}</span>
                              <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-forest-base/10 text-forest-base font-semibold text-[10px]">
                                {post.category}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-gray-700 font-medium">{post.author || "Registry"}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="w-12 h-8 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                <img
                                  src={post.image_url || "/images/chep/safety_exercise.png"}
                                  alt="Thumbnail"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  post.published ? "bg-emerald-100 text-emerald-accent" : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {post.published ? "Published" : "Draft"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditPost(post)}
                                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-2.5 py-1 rounded text-[11px] font-bold transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeletePost(post.id, post.title)}
                                  className="bg-red-50 hover:bg-red-100 text-red-600 px-2.5 py-1 rounded text-[11px] font-bold transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 4: PHOTOGRAPHS & MEDIA GALLERY */}
              {/* ========================================================= */}
              {activeTab === "media" && (
                <div className="bg-white rounded-3xl shadow-xs border border-border-subtle overflow-hidden p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-forest-dark">WordPress Media Library</h3>
                      <p className="text-xs text-text-muted">Manage campus photographs, laboratory pictures, and event galleries.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMediaModalOpen(true)}
                      className="bg-forest-base hover:bg-forest-medium text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span>
                      Add Photograph
                    </button>
                  </div>

                  {/* Photo Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mediaItems.map((item) => (
                      <div
                        key={item.id}
                        className="group relative bg-surface-canvas rounded-2xl overflow-hidden border border-border-subtle shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                      >
                        <div className="relative h-44 w-full bg-gray-100 overflow-hidden cursor-pointer" onClick={() => setSelectedPhotoPreview(item)}>
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                            {item.category}
                          </span>
                        </div>
                        <div className="p-4 space-y-2">
                          <h4 className="font-bold text-xs text-gray-900 line-clamp-1">{item.title}</h4>
                          <p className="text-[11px] text-text-muted line-clamp-2">{item.caption}</p>
                          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 font-mono">By {item.uploaded_by || "Admin"}</span>
                            <button
                              type="button"
                              onClick={() => handleDeleteMedia(item.id, item.title)}
                              className="text-red-500 hover:text-red-700 text-xs font-bold"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 5: STAFF & USERS MANAGER */}
              {/* ========================================================= */}
              {activeTab === "users" && (
                <div className="bg-white rounded-3xl shadow-xs border border-border-subtle overflow-hidden">
                  <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-lg font-bold text-forest-dark">Staff Accounts &amp; User Privileges</h3>
                      <p className="text-xs text-text-muted">Create administrative accounts, assign faculty roles, and manage access.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUserModalOpen(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">person_add</span>
                      Create Staff User
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-surface-canvas text-gray-600 uppercase tracking-wider font-bold">
                        <tr>
                          <th className="py-3 px-4">Staff Member &amp; Email</th>
                          <th className="py-3 px-4">Role</th>
                          <th className="py-3 px-4">Department</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {users.map((u) => (
                          <tr key={u.id} className="hover:bg-gray-50/60 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full overflow-hidden bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                                  {u.avatar_url ? (
                                    <img src={u.avatar_url} alt={u.full_name} className="w-full h-full object-cover" />
                                  ) : (
                                    u.full_name.slice(0, 2).toUpperCase()
                                  )}
                                </div>
                                <div>
                                  <span className="font-bold text-gray-900 block">{u.full_name}</span>
                                  <span className="text-[11px] text-text-muted font-mono">{u.email}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-gray-800">{u.role}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-gray-600">{u.department}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  u.status === "active" ? "bg-emerald-100 text-emerald-accent" : "bg-red-100 text-red-600"
                                }`}
                              >
                                {u.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleToggleUserStatus(u)}
                                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded text-[11px] font-bold transition-colors"
                                >
                                  {u.status === "active" ? "Suspend" : "Activate"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteUser(u.id, u.full_name)}
                                  className="bg-red-50 hover:bg-red-100 text-red-600 px-2.5 py-1 rounded text-[11px] font-bold transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 6: SITE SETTINGS & FEES */}
              {/* ========================================================= */}
              {activeTab === "settings" && (
                <div className="bg-white rounded-3xl shadow-xs border border-border-subtle p-6 space-y-6">
                  <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-forest-dark">Site Settings &amp; Global Announcements</h3>
                      <p className="text-xs text-text-muted">Update institutional banners, application fees, and contact lines across the website.</p>
                    </div>
                    {settingsSavedToast && (
                      <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow animate-in fade-in">
                        ✓ Changes Saved Live!
                      </span>
                    )}
                  </div>

                  <form onSubmit={handleSaveSettings} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-800">Global Website Ticker Announcement</label>
                      <textarea
                        rows={2}
                        value={settingsNotice}
                        onChange={(e) => setSettingsNotice(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                      />
                      <p className="text-[11px] text-text-muted">Floats at the top ticker on the Homepage and Portal header.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-800">Basic Nursing Application Fee (₦)</label>
                        <input
                          type="text"
                          value={settingsBasicFee}
                          onChange={(e) => setSettingsBasicFee(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs font-mono font-bold focus:outline-hidden"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-800">Post-Basic Midwifery Application Fee (₦)</label>
                        <input
                          type="text"
                          value={settingsMidwiferyFee}
                          onChange={(e) => setSettingsMidwiferyFee(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs font-mono font-bold focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-800">Registry Support Phone Hotlines</label>
                        <input
                          type="text"
                          value={settingsPhone}
                          onChange={(e) => setSettingsPhone(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-800">Institutional Enquiry Email</label>
                        <input
                          type="text"
                          value={settingsEmail}
                          onChange={(e) => setSettingsEmail(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                      <button
                        type="submit"
                        className="bg-forest-base hover:bg-forest-medium text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[16px]">save</span>
                        Save &amp; Sync Site Settings
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MODAL: POST CREATE / EDIT */}
        {/* ========================================================= */}
        {postModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="bg-forest-dark text-white p-5 flex items-center justify-between">
                <h3 className="font-bold text-base">{editingPost ? "Edit Blog Post" : "Create New Blog Post"}</h3>
                <button
                  type="button"
                  onClick={() => setPostModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <form onSubmit={handleSavePost} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Article Title</label>
                  <input
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Enter article headline..."
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Category Tag</label>
                    <select
                      value={postCategory}
                      onChange={(e) => setPostCategory(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                    >
                      <option>Admissions 2026/2027</option>
                      <option>Community Health</option>
                      <option>Total Care</option>
                      <option>Geriatric Care</option>
                      <option>Maternal &amp; Child Health</option>
                      <option>Academic Foundation</option>
                      <option>Clinical Rotations</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Author Name</label>
                    <input
                      type="text"
                      value={postAuthor}
                      onChange={(e) => setPostAuthor(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Featured Image Path / URL</label>
                  <input
                    type="text"
                    value={postImage}
                    onChange={(e) => setPostImage(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs font-mono focus:outline-hidden"
                  />
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                    <span className="text-gray-500">Quick select:</span>
                    <button
                      type="button"
                      onClick={() => setPostImage("/images/chep/safety_exercise.png")}
                      className="text-forest-base underline"
                    >
                      safety_exercise
                    </button>
                    <button
                      type="button"
                      onClick={() => setPostImage("/images/chep/blog_community_health.jpg")}
                      className="text-forest-base underline"
                    >
                      community_health
                    </button>
                    <button
                      type="button"
                      onClick={() => setPostImage("/images/chep/blog_total_care.jpg")}
                      className="text-forest-base underline"
                    >
                      total_care
                    </button>
                    <button
                      type="button"
                      onClick={() => setPostImage("/images/chep/blog_geriatric.jpg")}
                      className="text-forest-base underline"
                    >
                      geriatric
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Short Summary</label>
                  <textarea
                    rows={2}
                    value={postSummary}
                    onChange={(e) => setPostSummary(e.target.value)}
                    placeholder="Brief synopsis for feed cards..."
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Full Content Body</label>
                  <textarea
                    rows={4}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Write article paragraphs..."
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="publishedToggle"
                    checked={postPublished}
                    onChange={(e) => setPostPublished(e.target.checked)}
                    className="rounded text-forest-base"
                  />
                  <label htmlFor="publishedToggle" className="text-xs font-bold text-gray-700">
                    Publish immediately live on site
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setPostModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-orange-action text-white text-xs font-bold shadow-xs hover:bg-orange-700 transition-colors"
                  >
                    Save &amp; Publish Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL: ADD PHOTOGRAPH TO GALLERY */}
        {/* ========================================================= */}
        {mediaModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="bg-forest-dark text-white p-5 flex items-center justify-between">
                <h3 className="font-bold text-base">Add Photograph to Gallery</h3>
                <button
                  type="button"
                  onClick={() => setMediaModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <form onSubmit={handleSaveMedia} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Photograph Title</label>
                  <input
                    type="text"
                    required
                    value={mediaTitle}
                    onChange={(e) => setMediaTitle(e.target.value)}
                    placeholder="e.g. Clinical Simulation Ward Station 02..."
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Category</label>
                  <select
                    value={mediaCategory}
                    onChange={(e) => setMediaCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                  >
                    <option value="campus">Campus Architecture</option>
                    <option value="simulation">Clinical Simulation Lab</option>
                    <option value="ict">ICT Digital Center</option>
                    <option value="matriculation">Matriculation &amp; Events</option>
                    <option value="hostel">Students&apos; Hostel</option>
                    <option value="outreach">Community Outreach</option>
                    <option value="faculty">Academic Board</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Image Asset Path / URL</label>
                  <input
                    type="text"
                    required
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs font-mono focus:outline-hidden"
                  />
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                    <span className="text-gray-500">Pick:</span>
                    <button type="button" onClick={() => setMediaUrl("/images/chep/building.png")} className="text-forest-base underline">building</button>
                    <button type="button" onClick={() => setMediaUrl("/images/chep/laboratory.jpg")} className="text-forest-base underline">laboratory</button>
                    <button type="button" onClick={() => setMediaUrl("/images/chep/ict_center.jpg")} className="text-forest-base underline">ict_center</button>
                    <button type="button" onClick={() => setMediaUrl("/images/chep/dormitory.jpg")} className="text-forest-base underline">dormitory</button>
                    <button type="button" onClick={() => setMediaUrl("/images/chep/campus_event_chep6.jpeg")} className="text-forest-base underline">event6</button>
                    <button type="button" onClick={() => setMediaUrl("/images/chep/campus_event_chep14.jpeg")} className="text-forest-base underline">event14</button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Caption / Description</label>
                  <textarea
                    rows={2}
                    value={mediaCaption}
                    onChange={(e) => setMediaCaption(e.target.value)}
                    placeholder="Short description of the facility or occasion..."
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setMediaModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-forest-base text-white text-xs font-bold shadow-xs hover:bg-forest-medium transition-colors"
                  >
                    Add to Gallery
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL: CREATE USER */}
        {/* ========================================================= */}
        {userModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="bg-forest-dark text-white p-5 flex items-center justify-between">
                <h3 className="font-bold text-base">Create Staff / User Account</h3>
                <button
                  type="button"
                  onClick={() => setUserModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <form onSubmit={handleSaveUser} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    required
                    value={userFullName}
                    onChange={(e) => setUserFullName(e.target.value)}
                    placeholder="e.g. Dr. Babatunde Sowemimo..."
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Institutional Email</label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="user@chepnursingcollege.org"
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">System Role</label>
                    <select
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                    >
                      <option>Super Admin</option>
                      <option>Editor</option>
                      <option>Lecturer / Faculty</option>
                      <option>Bursar</option>
                      <option>Clinical Preceptor</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Department</label>
                    <select
                      value={userDept}
                      onChange={(e) => setUserDept(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                    >
                      <option>Academic Registry</option>
                      <option>Nursing Sciences</option>
                      <option>Clinical Practicum</option>
                      <option>Bursary &amp; Finance</option>
                      <option>ICT Division</option>
                      <option>Office of the Provost</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setUserModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-xs hover:bg-purple-700 transition-colors"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL: LIGHTBOX PHOTO PREVIEW */}
        {/* ========================================================= */}
        {selectedPhotoPreview && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl">
              <div className="relative h-96 w-full bg-black">
                <img
                  src={selectedPhotoPreview.image_url}
                  alt={selectedPhotoPreview.title}
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => setSelectedPhotoPreview(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-forest-dark">{selectedPhotoPreview.title}</h4>
                  <p className="text-xs text-text-muted mt-0.5">{selectedPhotoPreview.caption}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPhotoPreview(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL: CANDIDATE SENATE DOSSIER */}
        {/* ========================================================= */}
        {selectedDossier && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="bg-forest-dark text-white p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-forest-medium flex items-center justify-center text-primary-fixed">
                    <span className="material-symbols-outlined text-[24px]">verified</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold">Senate Admissions Dossier</h3>
                    <p className="text-xs text-gray-300 font-mono">Record ID: {selectedDossier.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDossier(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-surface-canvas border border-border-subtle">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-forest-base text-white font-black text-xl flex items-center justify-center shadow-md">
                      {selectedDossier.initials}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{selectedDossier.name}</h4>
                      <p className="text-xs text-forest-medium font-semibold">{selectedDossier.program} • {selectedDossier.duration}</p>
                      <p className="text-[11px] text-text-muted mt-0.5">{selectedDossier.batch}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        selectedDossier.status === "admitted"
                          ? "bg-emerald-500 text-white"
                          : "bg-amber-100 text-amber-vibrant"
                      }`}
                    >
                      {selectedDossier.status === "admitted" ? "Admitted to Senate" : "Screening Pending"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-gray-100 bg-surface-tint space-y-2">
                    <span className="text-xs font-bold text-forest-dark uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-forest-base text-[18px]">school</span>
                      O&apos;Level Science Evaluation
                    </span>
                    <div className="space-y-1 text-xs text-gray-700">
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span>English Language:</span>
                        <span className="font-bold text-emerald-accent">Credit (C4)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span>Mathematics:</span>
                        <span className="font-bold text-emerald-accent">Credit (B3)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span>Biology / Health Science:</span>
                        <span className="font-bold text-emerald-accent">Credit (A1)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span>Chemistry:</span>
                        <span className="font-bold text-emerald-accent">Credit (B2)</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Physics:</span>
                        <span className="font-bold text-emerald-accent">Credit (B3)</span>
                      </div>
                    </div>
                    <div className="pt-1 flex items-center gap-1 text-[11px] text-emerald-accent font-bold">
                      <span className="material-symbols-outlined text-[14px]">task_alt</span>
                      NMCN 5-Credit Criteria Satisfied
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 bg-surface-tint space-y-2">
                    <span className="text-xs font-bold text-forest-dark uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-orange-action text-[18px]">receipt_long</span>
                      Remita Financial Clearance
                    </span>
                    <div className="space-y-2 text-xs text-gray-700">
                      <div>
                        <span className="text-text-muted block text-[10px]">Reference RRR:</span>
                        <span className="font-mono font-bold text-gray-900">{selectedDossier.rrr}</span>
                      </div>
                      <div>
                        <span className="text-text-muted block text-[10px]">Settlement Status:</span>
                        <span className="font-bold text-emerald-accent">{selectedDossier.fee}</span>
                      </div>
                      <div>
                        <span className="text-text-muted block text-[10px]">Remita Gateway Batch:</span>
                        <span className="font-mono text-gray-600">REMITA-TSA-OG-2026-0811</span>
                      </div>
                    </div>
                    <div className="pt-2 flex items-center gap-1 text-[11px] text-emerald-accent font-bold">
                      <span className="material-symbols-outlined text-[14px]">task_alt</span>
                      Bursary Cleared
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-forest-base/5 border border-forest-base/10 text-xs text-gray-700 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-forest-dark">
                    <span className="material-symbols-outlined text-[16px] text-forest-base">verified_user</span>
                    NMCN Council Index Verification
                  </div>
                  <p className="text-[11px] text-text-muted">
                    Upon senate approval, this candidate profile is automatically forwarded to the Nursing &amp; Midwifery Council of Nigeria Registry for index allocation.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  Print Dossier
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleStatusChange(selectedDossier.id, selectedDossier.status === "admitted" ? "pending" : "admitted");
                      setSelectedDossier((prev) =>
                        prev
                          ? {
                              ...prev,
                              status: prev.status === "admitted" ? "pending" : "admitted",
                            }
                          : null
                      );
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                      selectedDossier.status === "admitted"
                        ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        : "bg-forest-base text-white hover:bg-forest-medium shadow-sm"
                    }`}
                  >
                    {selectedDossier.status === "admitted" ? "Revoke Admission" : "Admit Candidate"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDossier(null)}
                    className="px-4 py-2 rounded-xl bg-gray-200 text-gray-800 text-xs font-bold hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
