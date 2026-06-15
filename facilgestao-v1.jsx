import { useState, createContext, useContext, useCallback, useMemo } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --rosa:#E91E63;--rosa-l:#FCE4EC;--rosa-d:#C2185B;
  --choc:#5D4037;--choc-l:#EFEBE9;--choc-d:#3E2723;
  --creme:#FFF3E0;--bege:#F5E9DA;
  --ouro:#C9A227;--verde:#2ECC71;--red:#E74C3C;
  --txt:#424242;--txt-m:#757575;--txt-l:#9E9E9E;
  --bg:#F8F8F8;--white:#FFFFFF;--border:#E0E0E0;
  --shadow:0 1px 3px rgba(0,0,0,.08);
  --shadow-md:0 4px 12px rgba(0,0,0,.1);
  --radius:8px;--radius-lg:12px;
}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--txt);font-size:14px;line-height:1.5}
h1,h2,h3,h4,h5{font-family:'Poppins',sans-serif;color:var(--choc)}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:var(--bege)}
::-webkit-scrollbar-thumb{background:var(--choc-l);border-radius:3px}
::-webkit-scrollbar-thumb:hover{background:var(--choc)}

/* LAYOUT */
.layout{display:flex;min-height:100vh}
.sidebar{width:220px;min-height:100vh;background:var(--choc-d);display:flex;flex-direction:column;position:fixed;left:0;top:0;bottom:0;z-index:100;transition:width .2s}
.sidebar-brand{padding:20px 16px 16px;border-bottom:1px solid rgba(255,255,255,.08)}
.sidebar-brand-name{font-family:'Poppins',sans-serif;font-weight:700;font-size:16px;color:var(--ouro);letter-spacing:.3px}
.sidebar-brand-sub{font-size:10px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:1px;margin-top:2px}
.sidebar-nav{flex:1;padding:8px 0;overflow-y:auto}
.nav-group-label{padding:12px 16px 4px;font-size:10px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:rgba(255,255,255,.3)}
.nav-item{display:flex;align-items:center;gap:9px;padding:9px 16px;color:rgba(255,255,255,.65);cursor:pointer;font-size:13px;font-weight:500;border-left:3px solid transparent;transition:all .15s;user-select:none}
.nav-item:hover{color:#fff;background:rgba(255,255,255,.06)}
.nav-item.active{color:#fff;background:rgba(233,30,99,.18);border-left-color:var(--rosa)}
.nav-item svg{width:15px;height:15px;flex-shrink:0}
.nav-badge{margin-left:auto;background:var(--red);color:#fff;font-size:10px;font-weight:700;padding:1px 6px;border-radius:10px}
.sidebar-user{padding:12px 16px;border-top:1px solid rgba(255,255,255,.08)}
.sidebar-user-inner{display:flex;align-items:center;gap:9px;padding:8px;border-radius:var(--radius);cursor:pointer}
.sidebar-user-inner:hover{background:rgba(255,255,255,.06)}
.avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--rosa),var(--ouro));display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;font-weight:700;font-size:13px;color:#fff;flex-shrink:0}
.avatar-lg{width:40px;height:40px;font-size:16px}
.user-name{font-size:12px;font-weight:600;color:#fff}
.user-role{font-size:10px;color:rgba(255,255,255,.4)}
.main{margin-left:220px;flex:1;display:flex;flex-direction:column;min-height:100vh}
.topbar{height:56px;background:var(--white);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 24px;gap:12px;position:sticky;top:0;z-index:50}
.breadcrumb{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--txt-m)}
.breadcrumb-sep{color:var(--border)}
.breadcrumb-current{font-weight:600;color:var(--choc)}
.topbar-actions{margin-left:auto;display:flex;align-items:center;gap:8px}
.page{padding:24px}
.page-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px;gap:12px;flex-wrap:wrap}
.page-title{font-size:20px;font-weight:700;color:var(--choc);font-family:'Poppins',sans-serif;line-height:1.2}
.page-desc{font-size:13px;color:var(--txt-m);margin-top:3px;font-family:'Inter',sans-serif}

/* CARDS */
.card{background:var(--white);border-radius:var(--radius-lg);border:1px solid var(--border)}
.card-head{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:12px}
.card-title{font-size:14px;font-weight:600;color:var(--choc);font-family:'Poppins',sans-serif}
.card-body{padding:20px}
.stat-card{background:var(--white);border-radius:var(--radius-lg);border:1px solid var(--border);padding:18px;display:flex;gap:14px;align-items:flex-start;transition:box-shadow .15s}
.stat-card:hover{box-shadow:var(--shadow-md)}
.stat-icon{width:40px;height:40px;border-radius:var(--radius);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.stat-label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--txt-m);margin-bottom:4px}
.stat-val{font-size:22px;font-weight:700;font-family:'Poppins',sans-serif;color:var(--choc);line-height:1}
.stat-sub{font-size:11px;color:var(--txt-l);margin-top:4px}
.stat-up{color:var(--verde)}
.stat-dn{color:var(--red)}

/* GRID */
.g{display:grid;gap:16px}
.g2{grid-template-columns:repeat(2,1fr)}
.g3{grid-template-columns:repeat(3,1fr)}
.g4{grid-template-columns:repeat(4,1fr)}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:var(--radius);font-size:13px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;border:none;transition:all .15s;white-space:nowrap;user-select:none}
.btn:disabled{opacity:.5;cursor:not-allowed}
.btn-primary{background:var(--rosa);color:#fff}
.btn-primary:hover:not(:disabled){background:var(--rosa-d)}
.btn-secondary{background:var(--white);color:var(--choc);border:1.5px solid var(--border)}
.btn-secondary:hover:not(:disabled){border-color:var(--choc);background:var(--choc-l)}
.btn-danger{background:var(--red);color:#fff}
.btn-danger:hover:not(:disabled){background:#c0392b}
.btn-ghost{background:transparent;color:var(--txt-m);padding:6px 8px}
.btn-ghost:hover:not(:disabled){background:var(--bg);color:var(--txt)}
.btn-sm{padding:5px 11px;font-size:12px}
.btn-icon{padding:7px;border-radius:var(--radius)}
.btn-full{width:100%;justify-content:center}

/* BADGES */
.badge{display:inline-flex;align-items:center;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:600}
.badge-green{background:#E8F5E9;color:#2E7D32}
.badge-yellow{background:#FFF8E1;color:#F57F17}
.badge-red{background:#FFEBEE;color:#C62828}
.badge-blue{background:#E3F2FD;color:#1565C0}
.badge-pink{background:var(--rosa-l);color:var(--rosa-d)}
.badge-gray{background:#F5F5F5;color:#616161}
.badge-brown{background:var(--choc-l);color:var(--choc)}

/* TABLE */
.table-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:13px}
thead th{padding:10px 14px;text-align:left;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--txt-m);background:var(--bg);border-bottom:1px solid var(--border);white-space:nowrap}
tbody td{padding:12px 14px;border-bottom:1px solid var(--border);vertical-align:middle}
tbody tr:last-child td{border-bottom:none}
tbody tr:hover{background:#FAFAFA}
.td-actions{display:flex;gap:4px;align-items:center}

/* FORMS */
.form-group{margin-bottom:16px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.form-row-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
label{display:block;font-size:12px;font-weight:600;color:var(--txt);margin-bottom:5px}
.input,.select,.textarea{width:100%;padding:9px 12px;border:1.5px solid var(--border);border-radius:var(--radius);font-size:13px;font-family:'Inter',sans-serif;color:var(--txt);background:var(--white);outline:none;transition:border .15s}
.input:focus,.select:focus,.textarea:focus{border-color:var(--rosa);box-shadow:0 0 0 3px rgba(233,30,99,.08)}
.input.error,.select.error{border-color:var(--red)}
.select{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23757575' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;padding-right:30px}
.textarea{resize:vertical;min-height:80px}
.form-error{font-size:11px;color:var(--red);margin-top:4px}
.form-hint{font-size:11px;color:var(--txt-m);margin-top:4px}

/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px;animation:fadeIn .15s}
.modal{background:var(--white);border-radius:var(--radius-lg);width:100%;max-width:520px;max-height:92vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,.18);animation:slideUp .2s}
.modal-lg{max-width:680px}
.modal-sm{max-width:400px}
.modal-head{padding:18px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:var(--white);z-index:1}
.modal-head h3{font-size:16px;font-weight:700;font-family:'Poppins',sans-serif;color:var(--choc)}
.modal-body{padding:20px}
.modal-foot{padding:14px 20px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:8px;position:sticky;bottom:0;background:var(--white)}

/* ALERTS */
.alert{display:flex;align-items:flex-start;gap:10px;padding:11px 14px;border-radius:var(--radius);font-size:13px;margin-bottom:14px}
.alert-w{background:#FFF8E1;color:#7B5E00;border:1px solid #FFE082}
.alert-e{background:#FFEBEE;color:#B71C1C;border:1px solid #FFCDD2}
.alert-s{background:#E8F5E9;color:#1B5E20;border:1px solid #C8E6C9}
.alert-i{background:#E3F2FD;color:#0D47A1;border:1px solid #BBDEFB}
.alert svg{flex-shrink:0;margin-top:1px}

/* SEARCH */
.search-box{display:flex;align-items:center;gap:8px;background:var(--bg);border:1.5px solid var(--border);border-radius:var(--radius);padding:7px 12px}
.search-box input{background:transparent;border:none;outline:none;font-size:13px;font-family:'Inter',sans-serif;color:var(--txt);width:100%}
.search-box svg{color:var(--txt-l);flex-shrink:0;width:14px;height:14px}
.search-box:focus-within{border-color:var(--rosa)}

/* PROGRESS */
.progress{height:5px;background:var(--bege);border-radius:3px;overflow:hidden}
.progress-fill{height:100%;border-radius:3px;transition:width .4s}

/* TABS */
.tabs{display:flex;gap:4px;background:var(--bg);padding:4px;border-radius:var(--radius);border:1px solid var(--border);width:fit-content;margin-bottom:20px}
.tab{padding:6px 14px;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;color:var(--txt-m);transition:all .15s}
.tab.active{background:var(--white);color:var(--choc);font-weight:600;box-shadow:var(--shadow)}

/* EMPTY STATE */
.empty{text-align:center;padding:48px 20px;color:var(--txt-m)}
.empty svg{margin:0 auto 12px;color:var(--border)}
.empty h4{font-size:15px;color:var(--choc);margin-bottom:6px;font-family:'Poppins',sans-serif}
.empty p{font-size:13px;margin-bottom:16px}

/* INFO BOX */
.info-box{background:var(--choc-l);border-radius:var(--radius);padding:14px 16px;margin:14px 0}
.info-row{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid rgba(93,64,55,.1);font-size:13px}
.info-row:last-child{border-bottom:none;padding-bottom:0}
.info-row .lbl{color:var(--txt-m)}
.info-row .val{font-weight:600;color:var(--choc)}

/* TOAST */
.toast-wrap{position:fixed;bottom:20px;right:20px;z-index:500;display:flex;flex-direction:column;gap:6px}
.toast{padding:11px 15px;border-radius:var(--radius);font-size:13px;font-weight:500;display:flex;align-items:center;gap:8px;box-shadow:var(--shadow-md);animation:slideInR .2s;cursor:pointer;max-width:300px}
.toast-s{background:var(--verde);color:#fff}
.toast-e{background:var(--red);color:#fff}
.toast-i{background:var(--choc);color:#fff}
.toast-w{background:var(--ouro);color:#fff}

/* LOGIN */
.login-bg{min-height:100vh;background:linear-gradient(150deg,var(--choc-d) 0%,var(--choc) 60%,#8D5524 100%);display:flex;align-items:center;justify-content:center;padding:20px}
.login-box{width:100%;max-width:480px;background:var(--white);border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.25)}
.login-top{background:var(--choc-d);padding:28px 32px 24px;text-align:center}
.login-logo{font-size:40px;margin-bottom:8px}
.login-title{font-family:'Poppins',sans-serif;font-size:24px;font-weight:700;color:var(--ouro)}
.login-sub{font-size:13px;color:rgba(255,255,255,.5);margin-top:4px}
.login-body{padding:28px 32px 32px}
.role-selector{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:22px}
.role-btn{padding:14px 12px;border:2px solid var(--border);border-radius:var(--radius-lg);cursor:pointer;text-align:center;transition:all .15s;background:var(--white)}
.role-btn:hover{border-color:var(--rosa);background:var(--rosa-l)}
.role-btn.selected{border-color:var(--rosa);background:var(--rosa-l)}
.role-btn-icon{font-size:28px;margin-bottom:6px}
.role-btn-label{font-size:12px;font-weight:700;color:var(--choc);font-family:'Poppins',sans-serif}
.role-btn-desc{font-size:10px;color:var(--txt-m);margin-top:2px}
.divider{height:1px;background:var(--border);margin:16px 0}
.demo-hint{background:var(--creme);border-radius:var(--radius);padding:10px 14px;font-size:12px;color:var(--txt-m);margin-top:14px}

/* SVG MINI CHART */
.sparkline{width:100%;height:60px}

@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes slideInR{from{transform:translateX(16px);opacity:0}to{transform:translateX(0);opacity:1}}

/* PLATFORM ADMIN SPECIFICS */
.platform-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;background:var(--choc-d);color:var(--ouro);border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}

/* MISC */
.chip{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;background:var(--rosa-l);color:var(--rosa-d);border-radius:20px;font-size:11px;font-weight:600}
.sep{height:1px;background:var(--border);margin:16px 0}
.txt-right{text-align:right}
.txt-center{text-align:center}
.flex{display:flex}
.flex-col{flex-direction:column}
.items-center{align-items:center}
.justify-between{justify-content:space-between}
.gap-2{gap:8px}
.gap-3{gap:12px}
.gap-4{gap:16px}
.w-full{width:100%}
.mt-4{margin-top:16px}
.mb-4{margin-bottom:16px}
.mb-6{margin-bottom:24px}
.font-bold{font-weight:700}
.txt-muted{color:var(--txt-m)}
.txt-sm{font-size:12px}

@media(max-width:768px){
  .sidebar{width:200px;transform:translateX(-100%)}
  .main{margin-left:0}
  .g4{grid-template-columns:1fr 1fr}
  .g3{grid-template-columns:1fr}
  .g2{grid-template-columns:1fr}
  .form-row,.form-row-3{grid-template-columns:1fr}
  .page{padding:16px}
  .role-selector{grid-template-columns:1fr}
}
`;

/* ═══════════════════════════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════════════════════════ */
const Ic = ({ n, s = 16, c }) => {
  const st = { width: s, height: s, strokeWidth: 1.9, stroke: c || "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", flexShrink: 0 };
  const p = {
    dash: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    order: <><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></>,
    recipe: <><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></>,
    ing: <><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M8 12h8M12 8v8"/></>,
    stock: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></>,
    client: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>,
    fin: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></>,
    report: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="14" y2="17"/></>,
    cfg: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    up: <><polyline points="18 15 12 9 6 15"/></>,
    dn: <><polyline points="6 9 12 15 18 9"/></>,
    trend: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>,
    users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>,
    plans: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></>,
    support: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>,
    metrics: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    buy: <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    shop: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    dl: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
  };
  return <svg viewBox="0 0 24 24" style={st}>{p[n]}</svg>;
};

/* ═══════════════════════════════════════════════════════════════════════════
   UTILITIES
═══════════════════════════════════════════════════════════════════════════ */
const R = (v = 0) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
const N = (v = 0, d = 2) => new Intl.NumberFormat("pt-BR", { maximumFractionDigits: d }).format(v);
const nextId = arr => Math.max(0, ...arr.map(i => i.id)) + 1;
const today = () => new Date().toISOString().slice(0, 10);

/* Calcula o custo de um pedido diretamente pelo produto */
const calcOrderCostByProduct = (productId, qty, ingredients) => {
  const prod = ingredients.find(p => p.id === productId);
  return prod ? prod.costUnit * qty : 0;
};

/* Desconta qty diretamente do produto no estoque */
const deductStockForOrder = (productId, qty, _recipes, ingredients) =>
  ingredients.map(p => p.id === productId
    ? { ...p, stock: Math.max(0, parseFloat((p.stock - qty).toFixed(4))) }
    : p);

/* Restaura qty ao produto no estoque (ao excluir/cancelar pedido) */
const restoreStockForOrder = (productId, qty, _recipes, ingredients) =>
  ingredients.map(p => p.id === productId
    ? { ...p, stock: parseFloat((p.stock + qty).toFixed(4)) }
    : p);

const STOCK_STATUS = ing => {
  const r = ing.stock / Math.max(ing.minStock, 0.001);
  if (r <= 0.5) return { label: "Crítico", cls: "badge-red", color: "#E74C3C" };
  if (r <= 1) return { label: "Baixo", cls: "badge-yellow", color: "#C9A227" };
  return { label: "Normal", cls: "badge-green", color: "#2ECC71" };
};

const ORDER_STATUS = {
  pendente: { label: "Pendente", cls: "badge-yellow" },
  producao: { label: "Produção", cls: "badge-blue" },
  pronto: { label: "Pronto", cls: "badge-green" },
  entregue: { label: "Entregue", cls: "badge-gray" },
  cancelado: { label: "Cancelado", cls: "badge-red" },
};

const CONFEITARIA_STATUS = {
  ativa: { label: "Ativa", cls: "badge-green" },
  trial: { label: "Trial", cls: "badge-blue" },
  suspensa: { label: "Suspensa", cls: "badge-red" },
  pendente: { label: "Pendente", cls: "badge-yellow" },
};

/* ═══════════════════════════════════════════════════════════════════════════
   INITIAL DATA
═══════════════════════════════════════════════════════════════════════════ */
const INIT_CONFEITARIA = {
  /* Produtos finais que são vendidos. O estoque é controlado diretamente. */
  ingredients: [
    { id: 1, name: "Bolo de Chocolate Pequeno", category: "Bolos", unit: "un", costUnit: 28.00, precoVenda: 75.00, supplier: "Produção própria", stock: 3, minStock: 1, status: "ativo", obs: "Para 12 fatias" },
    { id: 2, name: "Caixa Brigadeiro 25un", category: "Docinhos", unit: "caixa", costUnit: 14.00, precoVenda: 45.00, supplier: "Produção própria", stock: 8, minStock: 2, status: "ativo", obs: "" },
    { id: 3, name: "Caixa Trufas 30un", category: "Trufas", unit: "caixa", costUnit: 18.00, precoVenda: 55.00, supplier: "Produção própria", stock: 5, minStock: 2, status: "ativo", obs: "" },
    { id: 4, name: "Brownie Fudge 12un", category: "Brownies", unit: "caixa", costUnit: 12.00, precoVenda: 38.00, supplier: "Produção própria", stock: 4, minStock: 1, status: "ativo", obs: "" },
    { id: 5, name: "Bolo de Chocolate Grande", category: "Bolos", unit: "un", costUnit: 50.00, precoVenda: 135.00, supplier: "Produção própria", stock: 1, minStock: 1, status: "ativo", obs: "Para 20 fatias" },
    { id: 6, name: "Ganache Premium 500g", category: "Coberturas", unit: "pote", costUnit: 8.00, precoVenda: 28.00, supplier: "Produção própria", stock: 0, minStock: 3, status: "ativo", obs: "" },
  ],
  recipes: [],
  orders: [
    { id: 1, clientId: 2, recipeId: 1, qty: 4, deliveryDate: "2024-03-15", status: "producao", price: 180, notes: "Embalar individualmente", createdAt: "2024-03-10" },
    { id: 2, clientId: 1, recipeId: 1, qty: 2, deliveryDate: "2024-03-16", status: "pendente", price: 90, notes: "Aniversário - escrever parabéns", createdAt: "2024-03-11" },
    { id: 3, clientId: 3, recipeId: 3, qty: 2, deliveryDate: "2024-03-14", status: "pronto", price: 110, notes: "", createdAt: "2024-03-09" },
    { id: 4, clientId: 2, recipeId: 2, qty: 8, deliveryDate: "2024-03-20", status: "entregue", price: 360, notes: "", createdAt: "2024-03-05" },
    { id: 5, clientId: 4, recipeId: 4, qty: 3, deliveryDate: "2024-03-18", status: "pendente", price: 114, notes: "Cortar em quadradinhos", createdAt: "2024-03-12" },
  ],
  clients: [
    { id: 1, name: "Maria Fernanda Silva", phone: "(11) 99876-5432", email: "maria@email.com", address: "Rua das Flores, 123 - SP", notes: "" },
    { id: 2, name: "Eventos Doce Vida Ltda", phone: "(11) 3456-7890", email: "contato@docevida.com", address: "Av. Paulista, 1000 - SP", notes: "Cliente corporativo" },
    { id: 3, name: "Ana Paula Santos", phone: "(21) 98765-4321", email: "ana@email.com", address: "Rua Copacabana, 45 - RJ", notes: "" },
    { id: 4, name: "Buffet Primavera Eventos", phone: "(11) 2345-6789", email: "buffet@primavera.com", address: "Rua das Acácias, 78 - SP", notes: "Encomendas mensais fixas" },
  ],
  purchases: [
    { id: 1, ingredientId: 2, qty: 10, totalCost: 140, date: "2024-03-10", supplier: "Produção própria", notes: "Produção semanal" },
    { id: 2, ingredientId: 1, qty: 3, totalCost: 84, date: "2024-03-12", supplier: "Produção própria", notes: "" },
  ],
  settings: { name: "Meu Negócio", owner: "Maria Silva", email: "contato@meunegocio.com", phone: "(11) 98765-0000", address: "Rua das Flores, 200 - SP", markup: 2.5, currency: "BRL" },
};

const INIT_PLATFORM = {
  confeitarias: [
    { id: 1, name: "Doce Sabor Confeitaria", owner: "Maria Silva", email: "maria@docesabor.com", phone: "(11) 98765-0000", plan: "pro", status: "ativa", createdAt: "2024-01-10", orders: 127, revenue: 8900 },
    { id: 2, name: "Chocolateria Artesanal", owner: "João Mendes", email: "joao@chocart.com", phone: "(21) 97654-3210", plan: "starter", status: "ativa", createdAt: "2024-01-22", orders: 43, revenue: 2800 },
    { id: 3, name: "Brigadeirias da Sueli", owner: "Sueli Costa", email: "sueli@brigadas.com", phone: "(31) 96543-2109", plan: "pro", status: "trial", createdAt: "2024-03-01", orders: 12, revenue: 890 },
    { id: 4, name: "Confeitaria Bella Vita", owner: "Carla Souza", email: "carla@bellavita.com", phone: "(41) 95432-1098", plan: "starter", status: "suspensa", createdAt: "2023-12-15", orders: 89, revenue: 5600 },
    { id: 5, name: "Tortas e Cia.", owner: "Paulo Lima", email: "paulo@tortasecia.com", phone: "(51) 94321-0987", plan: "enterprise", status: "ativa", createdAt: "2023-11-20", orders: 234, revenue: 18400 },
  ],
  plans: [
    { id: 1, name: "Starter", slug: "starter", price: 49.90, features: ["Até 50 pedidos/mês", "3 usuários", "Suporte por email"], maxOrders: 50, maxUsers: 3 },
    { id: 2, name: "Pro", slug: "pro", price: 99.90, features: ["Pedidos ilimitados", "10 usuários", "Suporte prioritário", "Relatórios avançados"], maxOrders: null, maxUsers: 10 },
    { id: 3, name: "Enterprise", slug: "enterprise", price: 199.90, features: ["Pedidos ilimitados", "Usuários ilimitados", "Suporte dedicado", "API access", "White label"], maxOrders: null, maxUsers: null },
  ],
  tickets: [
    { id: 1, confeitariaId: 1, subject: "Como exportar relatório em PDF?", message: "Preciso exportar os relatórios mensais.", status: "aberto", createdAt: "2024-03-13", priority: "normal" },
    { id: 2, confeitariaId: 3, subject: "Estoque não atualiza após pedido", message: "Criei um pedido mas o estoque não baixou.", status: "em_atendimento", createdAt: "2024-03-12", priority: "alta" },
    { id: 3, confeitariaId: 2, subject: "Dúvida sobre markup", message: "Como configurar o markup padrão?", status: "resolvido", createdAt: "2024-03-10", priority: "normal" },
  ],
  team: [
    { id: 1, name: "Admin FacilGestão", email: "admin@facilgestao.com", role: "platform_admin" },
    { id: 2, name: "Suporte Técnico", email: "suporte@facilgestao.com", role: "support_agent" },
  ],
  settings: { platformName: "FacilGestão", supportEmail: "suporte@facilgestao.com", trialDays: 14 },
};

/* ═══════════════════════════════════════════════════════════════════════════
   CONTEXT
═══════════════════════════════════════════════════════════════════════════ */
const Ctx = createContext();
const useStore = () => useContext(Ctx);

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════════════════════════════════════ */
function Toast({ toasts, remove }) {
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`} onClick={() => remove(t.id)}>
          {t.type === "s" && <Ic n="check" s={14} />}
          {t.type === "e" && <Ic n="x" s={14} />}
          {t.type === "w" && <Ic n="alert" s={14} />}
          {t.type === "i" && <Ic n="info" s={14} />}
          {t.msg}
        </div>
      ))}
    </div>
  );
}

function Modal({ open, onClose, title, children, footer, size, noClose }) {
  if (!open) return null;
  return (
    <div className="overlay" onClick={e => { if (!noClose && e.target === e.currentTarget) onClose(); }}>
      <div className={`modal ${size === "lg" ? "modal-lg" : size === "sm" ? "modal-sm" : ""}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-head">
          <h3>{title}</h3>
          {!noClose && <button className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Fechar"><Ic n="x" s={16} /></button>}
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

function Confirm({ open, onClose, onOk, msg }) {
  if (!open) return null;
  return (
    <div className="overlay">
      <div className="modal modal-sm">
        <div className="modal-body" style={{ textAlign: "center", padding: "28px 24px" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#FFEBEE", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <Ic n="alert" s={22} c="#C62828" />
          </div>
          <h3 style={{ fontSize: 16, marginBottom: 8 }}>Confirmar exclusão</h3>
          <p style={{ fontSize: 13, color: "var(--txt-m)" }}>{msg || "Tem certeza? Essa ação não pode ser desfeita."}</p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20 }}>
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button className="btn btn-danger" onClick={() => { onOk(); onClose(); }}>Excluir</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchBar({ value, onChange, placeholder = "Buscar..." }) {
  return (
    <div className="search-box" style={{ minWidth: 220 }}>
      <Ic n="search" />
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} aria-label={placeholder} />
      {value && <button className="btn btn-ghost btn-icon" style={{ padding: 2 }} onClick={() => onChange("")} aria-label="Limpar busca"><Ic n="x" s={12} /></button>}
    </div>
  );
}

function EmptyState({ icon, title, desc, action, onAction }) {
  return (
    <div className="empty">
      <Ic n={icon || "info"} s={40} />
      <h4>{title}</h4>
      <p>{desc}</p>
      {action && <button className="btn btn-primary" onClick={onAction}>{action}</button>}
    </div>
  );
}

function MiniBarChart({ data, color = "#E91E63" }) {
  if (!data.length) return null;
  const max = Math.max(...data.map(d => d.v), 1);
  const W = 300, H = 80, pad = 6;
  const bW = Math.max(8, (W - 2 * pad) / data.length - 4);
  const gap = (W - 2 * pad) / data.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="sparkline">
      {data.map((d, i) => {
        const bH = Math.max(2, (d.v / max) * (H - 20));
        const x = pad + i * gap + gap / 2 - bW / 2;
        const y = H - 16 - bH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bW} height={bH} rx={3} fill={color} opacity={0.8} />
            <text x={x + bW / 2} y={H - 2} textAnchor="middle" fontSize={8} fill="var(--txt-l)">{d.l}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LOGIN PAGE
═══════════════════════════════════════════════════════════════════════════ */
function LoginPage({ onLogin }) {
  const [role, setRole] = useState("confectionery_owner");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = () => {
    setErr("");
    if (!email.trim() || !pass.trim()) { setErr("Preencha e-mail e senha."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ role, email, name: role === "platform_admin" ? "Admin FacilGestão" : "Gestor do Negócio" });
    }, 700);
  };

  return (
    <div className="login-bg">
      <style>{STYLES}</style>
      <div className="login-box">
        <div className="login-top">
          <div className="login-logo">🏢</div>
          <div className="login-title">FacilGestão</div>
          <div className="login-sub">Gestão simples e inteligente para o seu negócio</div>
        </div>
        <div className="login-body">
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--choc)", marginBottom: 10, fontFamily: "'Poppins',sans-serif" }}>Como você vai entrar?</p>
          <div className="role-selector">
            <div className={`role-btn ${role === "platform_admin" ? "selected" : ""}`} onClick={() => setRole("platform_admin")} role="button" tabIndex={0} aria-pressed={role === "platform_admin"} onKeyDown={e => e.key === "Enter" && setRole("platform_admin")}>
              <div className="role-btn-icon">🛡️</div>
              <div className="role-btn-label">Administrador</div>
              <div className="role-btn-desc">Gestão da plataforma</div>
            </div>
            <div className={`role-btn ${role === "confectionery_owner" ? "selected" : ""}`} onClick={() => setRole("confectionery_owner")} role="button" tabIndex={0} aria-pressed={role === "confectionery_owner"} onKeyDown={e => e.key === "Enter" && setRole("confectionery_owner")}>
              <div className="role-btn-icon">🍰</div>
              <div className="role-btn-label">Meu Negócio</div>
              <div className="role-btn-desc">Gestão do seu negócio</div>
            </div>
          </div>

          {err && <div className="alert alert-e"><Ic n="alert" s={14} /> {err}</div>}

          <div className="form-group">
            <label htmlFor="login-email">E-mail</label>
            <input id="login-email" className="input" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
          </div>
          <div className="form-group" style={{ marginBottom: 20 }}>
            <label htmlFor="login-pass">Senha</label>
            <input id="login-pass" className="input" type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
          </div>
          <button className="btn btn-primary btn-full" onClick={submit} disabled={loading} style={{ padding: "11px" }}>
            {loading ? "Entrando..." : role === "platform_admin" ? "🛡️ Entrar como Administrador" : "🏪 Entrar como Meu Negócio"}
          </button>
          <div style={{ marginTop: 10, textAlign: "center" }}>
            <span style={{ fontSize: 12, color: "var(--txt-m)", textDecoration: "underline", cursor: "pointer" }}>Esqueci minha senha</span>
          </div>
          <div className="demo-hint">
            <strong>Demo:</strong> Use qualquer e-mail e senha. Selecione o tipo de acesso acima para ver o ambiente correspondente.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PLATFORM ADMIN – DASHBOARD
═══════════════════════════════════════════════════════════════════════════ */
function PlatformDash() {
  const { platform } = useStore();
  const { confeitarias, tickets } = platform;
  const ativas = confeitarias.filter(c => c.status === "ativa").length;
  const trial = confeitarias.filter(c => c.status === "trial").length;
  const mrr = confeitarias.filter(c => ["ativa", "trial"].includes(c.status)).reduce((s, c) => {
    const plan = { starter: 49.90, pro: 99.90, enterprise: 199.90 };
    return s + (plan[c.plan] || 0);
  }, 0);
  const open = tickets.filter(t => t.status === "aberto").length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard da Plataforma</h1>
          <p className="page-desc">Visão geral do FacilGestão como produto SaaS</p>
        </div>
        <span className="platform-badge"><Ic n="shield" s={11} /> ADMIN</span>
      </div>

      <div className="g g4 mb-4">
        {[
          { label: "Empresas Cadastradas", val: confeitarias.length, icon: "shop", bg: "#E3F2FD", ic: "#1565C0", sub: `${ativas} ativas` },
          { label: "Contas em Trial", val: trial, icon: "star", bg: "#FFF8E1", ic: "#C9A227", sub: `${14} dias restantes médio` },
          { label: "Receita Recorrente (MRR)", val: R(mrr), icon: "fin", bg: "#E8F5E9", ic: "#2E7D32", sub: "estimativa mensal" },
          { label: "Chamados Abertos", val: open, icon: "support", bg: open > 0 ? "#FFEBEE" : "#E8F5E9", ic: open > 0 ? "#C62828" : "#2E7D32", sub: `${tickets.length} total` },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}><Ic n={s.icon} s={18} c={s.ic} /></div>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-val">{s.val}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="g g2">
        <div className="card">
          <div className="card-head"><span className="card-title">Confeitarias Recentes</span></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Confeitaria</th><th>Plano</th><th>Status</th><th>Pedidos</th></tr></thead>
              <tbody>
                {confeitarias.slice(0, 5).map(c => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: "var(--txt-m)" }}>{c.owner}</div>
                    </td>
                    <td><span className="badge badge-brown" style={{ textTransform: "capitalize" }}>{c.plan}</span></td>
                    <td><span className={`badge ${CONFEITARIA_STATUS[c.status]?.cls}`}>{CONFEITARIA_STATUS[c.status]?.label}</span></td>
                    <td style={{ fontWeight: 600 }}>{c.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><span className="card-title">Chamados de Suporte</span></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Assunto</th><th>Status</th><th>Prioridade</th></tr></thead>
              <tbody>
                {tickets.map(t => {
                  const c = confeitarias.find(x => x.id === t.confeitariaId);
                  const stMap = { aberto: "badge-red", em_atendimento: "badge-yellow", resolvido: "badge-green" };
                  const stLabel = { aberto: "Aberto", em_atendimento: "Em Atendimento", resolvido: "Resolvido" };
                  return (
                    <tr key={t.id}>
                      <td>
                        <div style={{ fontWeight: 500 }}>{t.subject}</div>
                        <div style={{ fontSize: 11, color: "var(--txt-m)" }}>{c?.name}</div>
                      </td>
                      <td><span className={`badge ${stMap[t.status]}`}>{stLabel[t.status]}</span></td>
                      <td><span className={`badge ${t.priority === "alta" ? "badge-red" : "badge-gray"}`}>{t.priority}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-head"><span className="card-title">Distribuição por Plano</span></div>
        <div className="card-body">
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[["starter", "#1565C0"], ["pro", "#E91E63"], ["enterprise", "#C9A227"]].map(([slug, color]) => {
              const cnt = confeitarias.filter(c => c.plan === slug).length;
              const pct = confeitarias.length > 0 ? ((cnt / confeitarias.length) * 100).toFixed(0) : 0;
              return (
                <div key={slug} style={{ flex: 1, minWidth: 140 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                    <span style={{ fontWeight: 600, textTransform: "capitalize" }}>{slug}</span>
                    <span style={{ color: "var(--txt-m)" }}>{cnt} ({pct}%)</span>
                  </div>
                  <div className="progress">
                    <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PLATFORM ADMIN – CONFEITARIAS
═══════════════════════════════════════════════════════════════════════════ */
function PlatformConfeitarias() {
  const { platform, setPlatform, toast } = useStore();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [form, setForm] = useState({ name: "", owner: "", email: "", phone: "", plan: "starter", status: "trial" });
  const [errors, setErrors] = useState({});

  const filtered = useMemo(() =>
    platform.confeitarias.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.owner.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    ), [platform.confeitarias, search]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nome obrigatório";
    if (!form.email.trim()) e.email = "E-mail obrigatório";
    if (!form.owner.trim()) e.owner = "Responsável obrigatório";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openNew = () => { setEditing(null); setForm({ name: "", owner: "", email: "", phone: "", plan: "starter", status: "trial" }); setErrors({}); setModal(true); };
  const openEdit = c => { setEditing(c); setForm({ name: c.name, owner: c.owner, email: c.email, phone: c.phone, plan: c.plan, status: c.status }); setErrors({}); setModal(true); };

  const save = () => {
    if (!validate()) return;
    if (editing) {
      setPlatform(p => ({ ...p, confeitarias: p.confeitarias.map(c => c.id === editing.id ? { ...c, ...form } : c) }));
      toast("Confeitaria atualizada.", "s");
    } else {
      const id = nextId(platform.confeitarias);
      setPlatform(p => ({ ...p, confeitarias: [...p.confeitarias, { id, ...form, orders: 0, revenue: 0, createdAt: today() }] }));
      toast("Confeitaria cadastrada!", "s");
    }
    setModal(false);
  };

  const del = id => {
    setPlatform(p => ({ ...p, confeitarias: p.confeitarias.filter(c => c.id !== id) }));
    toast("Confeitaria removida.", "i");
  };

  const toggleStatus = (c) => {
    const next = c.status === "ativa" ? "suspensa" : "ativa";
    setPlatform(p => ({ ...p, confeitarias: p.confeitarias.map(x => x.id === c.id ? { ...x, status: next } : x) }));
    toast(`Conta ${next === "ativa" ? "ativada" : "suspensa"}.`, next === "ativa" ? "s" : "w");
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Empresas Cadastradas</h1>
          <p className="page-desc">{platform.confeitarias.length} empresa(s) na plataforma</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}><Ic n="plus" s={14} /> Nova Confeitaria</button>
      </div>

      <div className="card">
        <div className="card-head">
          <SearchBar value={search} onChange={setSearch} placeholder="Buscar por nome, responsável ou e-mail..." />
          <span className="txt-muted txt-sm">{filtered.length} resultado(s)</span>
        </div>
        <div className="table-wrap">
          {filtered.length === 0
            ? <EmptyState icon="shop" title="Nenhuma confeitaria encontrada" desc={search ? "Tente outro termo de busca." : "Cadastre a primeira confeitaria."} action={!search ? "+ Nova Confeitaria" : null} onAction={openNew} />
            : <table>
              <thead><tr><th>Confeitaria</th><th>Contato</th><th>Plano</th><th>Status</th><th>Cadastro</th><th>Pedidos</th><th>Ações</th></tr></thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id}>
                    <td><div style={{ fontWeight: 600 }}>{c.name}</div><div style={{ fontSize: 11, color: "var(--txt-m)" }}>{c.owner}</div></td>
                    <td><div style={{ fontSize: 12 }}>{c.email}</div><div style={{ fontSize: 11, color: "var(--txt-m)" }}>{c.phone}</div></td>
                    <td><span className="badge badge-brown" style={{ textTransform: "capitalize" }}>{c.plan}</span></td>
                    <td><span className={`badge ${CONFEITARIA_STATUS[c.status]?.cls}`}>{CONFEITARIA_STATUS[c.status]?.label}</span></td>
                    <td className="txt-muted" style={{ fontSize: 12 }}>{c.createdAt}</td>
                    <td style={{ fontWeight: 600 }}>{c.orders}</td>
                    <td>
                      <div className="td-actions">
                        <button className="btn btn-ghost btn-icon btn-sm" title="Editar" onClick={() => openEdit(c)}><Ic n="edit" s={14} /></button>
                        <button className="btn btn-ghost btn-icon btn-sm" title={c.status === "ativa" ? "Suspender" : "Ativar"} onClick={() => toggleStatus(c)} style={{ color: c.status === "ativa" ? "#E74C3C" : "#2ECC71" }}><Ic n={c.status === "ativa" ? "dn" : "check"} s={14} /></button>
                        <button className="btn btn-ghost btn-icon btn-sm" title="Excluir" onClick={() => setConfirm(c.id)} style={{ color: "#E74C3C" }}><Ic n="trash" s={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Editar Confeitaria" : "Nova Confeitaria"}
        footer={<><button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Salvar</button></>}>
        <div className="form-group"><label>Nome do Negócio *</label><input className={`input ${errors.name ? "error" : ""}`} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Ex: Doce Sabor Confeitaria" />{errors.name && <div className="form-error">{errors.name}</div>}</div>
        <div className="form-group"><label>Responsável *</label><input className={`input ${errors.owner ? "error" : ""}`} value={form.owner} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))} placeholder="Nome do proprietário" />{errors.owner && <div className="form-error">{errors.owner}</div>}</div>
        <div className="form-row">
          <div className="form-group"><label>E-mail *</label><input className={`input ${errors.email ? "error" : ""}`} type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />{errors.email && <div className="form-error">{errors.email}</div>}</div>
          <div className="form-group"><label>Telefone</label><input className="input" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(00) 00000-0000" /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Plano</label>
            <select className="select" value={form.plan} onChange={e => setForm(f => ({ ...f, plan: e.target.value }))}>
              <option value="starter">Starter - R$ 49,90/mês</option>
              <option value="pro">Pro - R$ 99,90/mês</option>
              <option value="enterprise">Enterprise - R$ 199,90/mês</option>
            </select>
          </div>
          <div className="form-group"><label>Status</label>
            <select className="select" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              <option value="trial">Trial</option>
              <option value="ativa">Ativa</option>
              <option value="suspensa">Suspensa</option>
              <option value="pendente">Pendente</option>
            </select>
          </div>
        </div>
      </Modal>

      <Confirm open={!!confirm} onClose={() => setConfirm(null)} onOk={() => del(confirm)} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PLATFORM ADMIN – PLANS
═══════════════════════════════════════════════════════════════════════════ */
function PlatformPlans() {
  const { platform, setPlatform, toast } = useStore();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", maxOrders: "", maxUsers: "" });

  const openEdit = p => { setEditing(p); setForm({ name: p.name, price: String(p.price), maxOrders: p.maxOrders || "", maxUsers: p.maxUsers || "" }); setModal(true); };
  const save = () => {
    if (!editing) return;
    setPlatform(p => ({ ...p, plans: p.plans.map(pl => pl.id === editing.id ? { ...pl, name: form.name, price: parseFloat(form.price) || pl.price, maxOrders: form.maxOrders ? parseInt(form.maxOrders) : null, maxUsers: form.maxUsers ? parseInt(form.maxUsers) : null } : pl) }));
    toast("Plano atualizado.", "s");
    setModal(false);
  };

  return (
    <div>
      <div className="page-header"><h1 className="page-title">Planos e Assinaturas</h1><p className="page-desc">Gerencie os planos disponíveis na plataforma</p></div>
      <div className="g g3">
        {platform.plans.map(plan => {
          const subscribers = platform.confeitarias.filter(c => c.plan === plan.slug && ["ativa", "trial"].includes(c.status)).length;
          const mrr = subscribers * plan.price;
          return (
            <div key={plan.id} className="card">
              <div className="card-head">
                <span className="card-title">{plan.name}</span>
                <button className="btn btn-ghost btn-icon btn-sm" onClick={() => openEdit(plan)}><Ic n="edit" s={14} /></button>
              </div>
              <div className="card-body">
                <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Poppins',sans-serif", color: "var(--choc)", marginBottom: 12 }}>{R(plan.price)}<span style={{ fontSize: 12, fontWeight: 400, color: "var(--txt-m)" }}>/mês</span></div>
                <div className="info-box" style={{ marginTop: 0 }}>
                  <div className="info-row"><span className="lbl">Assinantes ativos</span><span className="val">{subscribers}</span></div>
                  <div className="info-row"><span className="lbl">MRR</span><span className="val" style={{ color: "var(--verde)" }}>{R(mrr)}</span></div>
                  <div className="info-row"><span className="lbl">Pedidos/mês</span><span className="val">{plan.maxOrders ? plan.maxOrders : "Ilimitado"}</span></div>
                  <div className="info-row" style={{ border: "none", paddingBottom: 0 }}><span className="lbl">Usuários</span><span className="val">{plan.maxUsers ? plan.maxUsers : "Ilimitado"}</span></div>
                </div>
                <ul style={{ marginTop: 12, paddingLeft: 16 }}>
                  {plan.features.map((f, i) => <li key={i} style={{ fontSize: 12, color: "var(--txt-m)", marginBottom: 4 }}>✓ {f}</li>)}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Editar Plano"
        footer={<><button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Salvar</button></>}>
        <div className="form-group"><label>Nome do Plano</label><input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
        <div className="form-row">
          <div className="form-group"><label>Preço (R$/mês)</label><input className="input" type="number" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} /></div>
          <div className="form-group"><label>Max pedidos/mês (vazio = ilimitado)</label><input className="input" type="number" value={form.maxOrders} onChange={e => setForm(f => ({ ...f, maxOrders: e.target.value }))} placeholder="Ilimitado" /></div>
        </div>
        <div className="form-group"><label>Max usuários (vazio = ilimitado)</label><input className="input" type="number" value={form.maxUsers} onChange={e => setForm(f => ({ ...f, maxUsers: e.target.value }))} placeholder="Ilimitado" /></div>
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PLATFORM ADMIN – SUPPORT
═══════════════════════════════════════════════════════════════════════════ */
function PlatformSupport() {
  const { platform, setPlatform, toast } = useStore();
  const [filter, setFilter] = useState("aberto");

  const updateStatus = (id, status) => {
    setPlatform(p => ({ ...p, tickets: p.tickets.map(t => t.id === id ? { ...t, status } : t) }));
    toast("Status do chamado atualizado.", "s");
  };

  const stMap = { aberto: "badge-red", em_atendimento: "badge-yellow", resolvido: "badge-green" };
  const stLabel = { aberto: "Aberto", em_atendimento: "Em Atendimento", resolvido: "Resolvido" };
  const filtered = platform.tickets.filter(t => filter === "todos" || t.status === filter);

  return (
    <div>
      <div className="page-header"><h1 className="page-title">Suporte</h1><p className="page-desc">{platform.tickets.filter(t => t.status === "aberto").length} chamado(s) aberto(s)</p></div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[["todos", "Todos"], ["aberto", "Abertos"], ["em_atendimento", "Em Atendimento"], ["resolvido", "Resolvidos"]].map(([v, l]) => (
          <button key={v} className={`btn btn-sm ${filter === v ? "btn-primary" : "btn-secondary"}`} onClick={() => setFilter(v)}>{l}</button>
        ))}
      </div>
      <div className="card">
        <div className="table-wrap">
          {filtered.length === 0
            ? <EmptyState icon="support" title="Nenhum chamado" desc="Ótimo! Sem chamados nesta categoria." />
            : <table>
              <thead><tr><th>Chamado</th><th>Confeitaria</th><th>Prioridade</th><th>Status</th><th>Data</th><th>Ações</th></tr></thead>
              <tbody>
                {filtered.map(t => {
                  const c = platform.confeitarias.find(x => x.id === t.confeitariaId);
                  return (
                    <tr key={t.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{t.subject}</div>
                        <div style={{ fontSize: 11, color: "var(--txt-m)" }}>{t.message.slice(0, 60)}...</div>
                      </td>
                      <td>{c?.name || "—"}</td>
                      <td><span className={`badge ${t.priority === "alta" ? "badge-red" : "badge-gray"}`}>{t.priority}</span></td>
                      <td><span className={`badge ${stMap[t.status]}`}>{stLabel[t.status]}</span></td>
                      <td className="txt-muted" style={{ fontSize: 12 }}>{t.createdAt}</td>
                      <td>
                        <div className="td-actions">
                          {t.status === "aberto" && <button className="btn btn-ghost btn-sm" onClick={() => updateStatus(t.id, "em_atendimento")}>Atender</button>}
                          {t.status === "em_atendimento" && <button className="btn btn-ghost btn-sm" onClick={() => updateStatus(t.id, "resolvido")}>Resolver</button>}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          }
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PLATFORM ADMIN – SETTINGS
═══════════════════════════════════════════════════════════════════════════ */
function PlatformSettings({ onLogout }) {
  const { platform, setPlatform, toast } = useStore();
  const [form, setForm] = useState({ ...platform.settings });
  const [saved, setSaved] = useState(false);
  const save = () => { setPlatform(p => ({ ...p, settings: form })); setSaved(true); toast("Configurações salvas!", "s"); setTimeout(() => setSaved(false), 2000); };
  return (
    <div>
      <div className="page-header"><h1 className="page-title">Configurações da Plataforma</h1></div>
      {saved && <div className="alert alert-s"><Ic n="check" s={14} /> Configurações salvas com sucesso!</div>}
      <div className="g g2">
        <div className="card">
          <div className="card-head"><span className="card-title">Dados da Plataforma</span></div>
          <div className="card-body">
            <div className="form-group"><label>Nome da Plataforma</label><input className="input" value={form.platformName} onChange={e => setForm(f => ({ ...f, platformName: e.target.value }))} /></div>
            <div className="form-group"><label>E-mail de Suporte</label><input className="input" type="email" value={form.supportEmail} onChange={e => setForm(f => ({ ...f, supportEmail: e.target.value }))} /></div>
            <div className="form-group"><label>Dias de Trial Padrão</label><input className="input" type="number" value={form.trialDays} onChange={e => setForm(f => ({ ...f, trialDays: parseInt(e.target.value) }))} /></div>
            <button className="btn btn-primary btn-full" onClick={save}>Salvar Configurações</button>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><span className="card-title">Equipe Interna</span></div>
          <div className="card-body">
            {platform.team.map(m => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <div className="avatar">{m.name[0]}</div>
                <div><div style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</div><div style={{ fontSize: 11, color: "var(--txt-m)" }}>{m.email}</div></div>
                <span className="badge badge-brown" style={{ marginLeft: "auto" }}>{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-body" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div><div style={{ fontWeight: 600 }}>Sair da conta</div><div style={{ fontSize: 12, color: "var(--txt-m)" }}>Retornar para a tela de login</div></div>
          <button className="btn btn-danger" onClick={onLogout}><Ic n="logout" s={14} /> Sair</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PLATFORM ADMIN – SHELL
═══════════════════════════════════════════════════════════════════════════ */
function PlatformAdmin({ user, onLogout }) {
  const [page, setPage] = useState("dash");
  const { platform } = useStore();

  const openTickets = platform.tickets.filter(t => t.status === "aberto").length;
  const pendingConf = platform.confeitarias.filter(c => c.status === "pendente").length;

  const nav = [
    { id: "dash", label: "Dashboard", icon: "dash", group: "VISÃO GERAL" },
    { id: "confeitarias", label: "Confeitarias", icon: "shop", badge: pendingConf > 0 ? pendingConf : null, group: "CLIENTES" },
    { id: "plans", label: "Planos", icon: "plans" },
    { id: "support", label: "Suporte", icon: "support", badge: openTickets > 0 ? openTickets : null, group: "OPERAÇÕES" },
    { id: "settings", label: "Configurações", icon: "cfg", group: "SISTEMA" },
  ];

  const PAGES = {
    dash: <PlatformDash />,
    confeitarias: <PlatformConfeitarias />,
    plans: <PlatformPlans />,
    support: <PlatformSupport />,
    settings: <PlatformSettings onLogout={onLogout} />,
  };

  const pageName = nav.find(n => n.id === page)?.label;

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-name">🍫 FacilGestão</div>
          <div className="sidebar-brand-sub">Plataforma SaaS</div>
        </div>
        <div style={{ padding: "8px 16px 4px", marginTop: 4 }}>
          <span className="platform-badge" style={{ fontSize: 9 }}><Ic n="shield" s={9} /> ADMIN DA PLATAFORMA</span>
        </div>
        <nav className="sidebar-nav" role="navigation" aria-label="Navegação da plataforma">
          {nav.map(item => (
            <div key={item.id}>
              {item.group && <div className="nav-group-label">{item.group}</div>}
              <div className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)} role="menuitem" tabIndex={0} onKeyDown={e => e.key === "Enter" && setPage(item.id)} aria-current={page === item.id ? "page" : undefined}>
                <Ic n={item.icon} />
                <span>{item.label}</span>
                {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
              </div>
            </div>
          ))}
        </nav>
        <div className="sidebar-user">
          <div className="sidebar-user-inner" onClick={() => setPage("settings")}>
            <div className="avatar">{user.name[0]}</div>
            <div><div className="user-name">{user.name}</div><div className="user-role">Administrador</div></div>
          </div>
        </div>
      </aside>
      <main className="main" role="main">
        <div className="topbar">
          <nav className="breadcrumb" aria-label="Localização">
            <span>Plataforma</span><span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{pageName}</span>
          </nav>
        </div>
        <div className="page">{PAGES[page]}</div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONFECTIONERY – DASHBOARD
═══════════════════════════════════════════════════════════════════════════ */
function ConfDash({ setPage }) {
  const { conf } = useStore();
  const { ingredients, orders, settings } = conf;

  const validOrders = orders.filter(o => o.status !== "cancelado");
  const revenue = validOrders.reduce((s, o) => s + o.price, 0);
  const totalCost = validOrders.reduce((s, o) => {
    const p = ingredients.find(x => x.id === o.recipeId);
    return s + (p ? p.costUnit * o.qty : 0);
  }, 0);
  const profit = revenue - totalCost;
  const margin = revenue > 0 ? (profit / revenue * 100).toFixed(1) : 0;
  const activeOrders = orders.filter(o => ["pendente", "producao"].includes(o.status)).length;
  const lateOrders = orders.filter(o => o.status !== "entregue" && o.status !== "cancelado" && o.deliveryDate < today()).length;
  const lowStock = ingredients.filter(i => i.minStock > 0 && i.stock <= i.minStock);

  const topProducts = ingredients.map(p => ({
    ...p,
    qty: validOrders.filter(o => o.recipeId === p.id).reduce((s, o) => s + o.qty, 0),
    rev: validOrders.filter(o => o.recipeId === p.id).reduce((s, o) => s + o.price, 0),
  })).filter(p => p.qty > 0).sort((a, b) => b.qty - a.qty).slice(0, 4);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-desc">Bem-vindo! Aqui está o resumo do seu negócio.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {lateOrders > 0 && <div className="alert alert-e" style={{ margin: 0, padding: "8px 12px" }}><Ic n="alert" s={14} /> {lateOrders} pedido(s) atrasado(s)</div>}
        </div>
      </div>

      {lowStock.length > 0 && (
        <div className="alert alert-w mb-4">
          <Ic n="alert" s={14} />
          <span><strong>{lowStock.length} ingrediente(s) com estoque baixo:</strong> {lowStock.slice(0, 3).map(p => p.name).join(", ")}{lowStock.length > 3 ? `... +${lowStock.length - 3}` : ""}. <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => setPage("stock")}>Ver estoque →</span></span>
        </div>
      )}

      <div className="g g4 mb-4">
        {[
          { label: "Receita Total", val: R(revenue), icon: "fin", bg: "#FCE4EC", ic: "#C2185B", sub: profit > 0 ? `Lucro: ${R(profit)}` : "Sem lucro", subCls: profit > 0 ? "stat-up" : "stat-dn" },
          { label: "Margem de Lucro", val: `${margin}%`, icon: "trend", bg: "#E8F5E9", ic: "#2E7D32", sub: `Custo: ${R(totalCost)}`, subCls: margin > 30 ? "stat-up" : "stat-dn" },
          { label: "Pedidos Ativos", val: activeOrders, icon: "order", bg: "#E3F2FD", ic: "#1565C0", sub: `${orders.length} no total`, subCls: "" },
          { label: "Alerta de Estoque", val: lowStock.length, icon: "stock", bg: lowStock.length > 0 ? "#FFEBEE" : "#E8F5E9", ic: lowStock.length > 0 ? "#C62828" : "#2E7D32", sub: lowStock.length > 0 ? "Reposição necessária" : "Estoque em dia", subCls: lowStock.length > 0 ? "stat-dn" : "stat-up" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}><Ic n={s.icon} s={18} c={s.ic} /></div>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-val">{s.val}</div>
              <div className={`stat-sub ${s.subCls}`}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="g g2 mb-4">
        <div className="card">
          <div className="card-head"><span className="card-title">Produtos Mais Vendidos</span></div>
          <div className="card-body">
            <MiniBarChart data={topProducts.map(r => ({ l: r.name.split(" ")[0], v: r.qty }))} />
            {topProducts.map((r, i) => (
              <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < topProducts.length - 1 ? "1px solid var(--border)" : "none" }}>
                <span style={{ fontSize: 18 }}>{r.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: "var(--txt-m)" }}>{r.qty} unidades vendidas</div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--verde)" }}>{R(r.rev)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <span className="card-title">Alertas de Estoque</span>
            {lowStock.length > 0 && <span className="badge badge-red">{lowStock.length}</span>}
          </div>
          {lowStock.length === 0
            ? <div style={{ padding: "24px", textAlign: "center", color: "var(--txt-m)", fontSize: 13 }}><Ic n="check" s={28} c="var(--verde)" /><br />Estoque em ordem!</div>
            : lowStock.map(ing => {
              const st = STOCK_STATUS(ing);
              const pct = Math.min(ing.stock / Math.max(ing.minStock, 0.001), 1);
              return (
                <div key={ing.id} style={{ padding: "10px 16px", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{ing.name}</span>
                    <span className={`badge ${st.cls}`}>{st.label}</span>
                  </div>
                  <div className="progress"><div className="progress-fill" style={{ width: `${pct * 100}%`, background: st.color }} /></div>
                  <div style={{ fontSize: 11, color: "var(--txt-m)", marginTop: 4 }}>
                    {N(ing.stock, 0)} {ing.unit} / mín. {N(ing.minStock, 0)} {ing.unit}
                  </div>
                </div>
              );
            })
          }
          {lowStock.length > 0 && (
            <div style={{ padding: "12px 16px" }}>
              <button className="btn btn-secondary btn-sm btn-full" onClick={() => setPage("stock")}>Ver Estoque Completo →</button>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-title">Pedidos Recentes</span>
          <button className="btn btn-ghost btn-sm" onClick={() => setPage("orders")}>Ver todos →</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>#</th><th>Cliente</th><th>Produto</th><th>Qtd</th><th>Entrega</th><th>Valor</th><th>Status</th></tr></thead>
            <tbody>
              {[...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5).map(ord => {
                const client = conf.clients.find(c => c.id === ord.clientId);
                const prod = ingredients.find(p => p.id === ord.recipeId);
                const st = ORDER_STATUS[ord.status];
                return (
                  <tr key={ord.id}>
                    <td style={{ color: "var(--rosa)", fontWeight: 700 }}>#{ord.id}</td>
                    <td style={{ fontWeight: 500 }}>{client?.name?.split(" ").slice(0, 2).join(" ") || "—"}</td>
                    <td style={{ fontWeight: 500 }}>{prod?.name || "—"}</td>
                    <td>{N(ord.qty, 0)}</td>
                    <td style={{ fontSize: 12 }}>{ord.deliveryDate || "—"}</td>
                    <td style={{ fontWeight: 600 }}>{R(ord.price)}</td>
                    <td><span className={`badge ${st?.cls}`}>{st?.label}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONFECTIONERY – PRODUTOS
═══════════════════════════════════════════════════════════════════════════ */
function ConfProdutos() {
  const { conf, setConf, toast } = useStore();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: "", category: "Bolos", unit: "un", costUnit: "", precoVenda: "", supplier: "", stock: "0", minStock: "0", obs: "" });

  const CATS = ["Bolos", "Docinhos", "Trufas", "Brownies", "Tortas", "Bebidas", "Coberturas", "Outros"];
  const UNITS = ["un", "caixa", "kg", "g", "L", "ml", "pote", "pacote", "bandeja"];

  const filtered = useMemo(() => conf.ingredients.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase()) ||
    i.supplier.toLowerCase().includes(search.toLowerCase())
  ), [conf.ingredients, search]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nome obrigatório";
    if (!form.costUnit || isNaN(parseFloat(form.costUnit))) e.costUnit = "Custo inválido";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const openNew = () => { setEditing(null); setForm({ name: "", category: "Bolos", unit: "un", costUnit: "", precoVenda: "", supplier: "", stock: "0", minStock: "0", obs: "" }); setErrors({}); setModal(true); };
  const openEdit = ing => { setEditing(ing); setForm({ name: ing.name, category: ing.category, unit: ing.unit, costUnit: String(ing.costUnit), precoVenda: String(ing.precoVenda || ""), supplier: ing.supplier || "", stock: String(ing.stock), minStock: String(ing.minStock), obs: ing.obs || "" }); setErrors({}); setModal(true); };

  const save = () => {
    if (!validate()) return;
    const item = { ...form, costUnit: parseFloat(form.costUnit), precoVenda: parseFloat(form.precoVenda) || 0, stock: parseFloat(form.stock) || 0, minStock: parseFloat(form.minStock) || 0 };
    if (editing) {
      setConf(c => ({ ...c, ingredients: c.ingredients.map(i => i.id === editing.id ? { ...item, id: editing.id } : i) }));
      toast("Produto atualizado!", "s");
    } else {
      const id = nextId(conf.ingredients);
      setConf(c => ({ ...c, ingredients: [...c.ingredients, { id, ...item }] }));
      toast("Produto cadastrado no estoque!", "s");
    }
    setModal(false);
  };

  const del = id => { setConf(c => ({ ...c, ingredients: c.ingredients.filter(i => i.id !== id) })); toast("Produto removido.", "i"); };

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Ingredientes</h1><p className="page-desc">{conf.ingredients.length} produtos cadastrados no estoque</p></div>
        <button className="btn btn-primary" onClick={openNew}><Ic n="plus" s={14} /> Novo Produto</button>
      </div>

      <div className="card">
        <div className="card-head">
          <SearchBar value={search} onChange={setSearch} placeholder="Buscar por nome, categoria ou fornecedor..." />
          <span className="txt-muted txt-sm">{filtered.length} resultado(s)</span>
        </div>
        <div className="table-wrap">
          {filtered.length === 0
            ? <EmptyState icon="ing" title="Nenhum produto" desc="Cadastre produtos para controlar o estoque." action="+ Novo Produto" onAction={openNew} />
            : <table>
              <thead><tr><th>Produto</th><th>Categoria</th><th>Custo/Un.</th><th>Preço Venda</th><th>Estoque</th><th>Mínimo</th><th>Status</th><th>Ações</th></tr></thead>
              <tbody>
                {filtered.map(ing => {
                  const st = STOCK_STATUS(ing);
                  return (
                    <tr key={ing.id}>
                      <td><div style={{ fontWeight: 600 }}>{ing.name}</div>{ing.obs && <div style={{ fontSize: 11, color: "var(--txt-m)" }}>{ing.obs}</div>}</td>
                      <td><span className="badge badge-brown">{ing.category}</span></td>
                      <td>{R(ing.costUnit)}/{ing.unit}</td>
                      <td style={{ fontWeight: 600, color: "var(--verde)" }}>{R(ing.precoVenda || 0)}/{ing.unit}</td>
                      <td><strong>{N(ing.stock, 0)}</strong> {ing.unit}</td>
                      <td className="txt-muted">{N(ing.minStock, 0)} {ing.unit}</td>
                      <td><span className={`badge ${st.cls}`}>{st.label}</span></td>
                      <td>
                        <div className="td-actions">
                          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => openEdit(ing)} title="Editar"><Ic n="edit" s={14} /></button>
                          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setConfirm(ing.id)} style={{ color: "#E74C3C" }} title="Excluir"><Ic n="trash" s={14} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          }
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Editar Produto" : "Novo Produto"}
        footer={<><button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Salvar Produto</button></>}>
        <div className="form-group"><label>Nome do Produto *</label><input className={`input ${errors.name ? "error" : ""}`} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Ex: Bolo de Chocolate Pequeno" />{errors.name && <div className="form-error">{errors.name}</div>}</div>
        <div className="form-row">
          <div className="form-group"><label>Categoria</label>
            <select className="select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {CATS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group"><label>Unidade de medida</label>
            <select className="select" value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}>
              {UNITS.map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Custo por {form.unit || "un"} (R$) *</label>
            <input className={`input ${errors.costUnit ? "error" : ""}`} type="number" step="0.01" min="0" value={form.costUnit} onChange={e => setForm(f => ({ ...f, costUnit: e.target.value }))} placeholder="0,00" />
            {errors.costUnit && <div className="form-error">{errors.costUnit}</div>}
          </div>
          <div className="form-group"><label>Observações</label><input className="input" value={form.notes || ""} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Nota fiscal, lote, etc." /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Estoque atual ({form.unit})</label><input className="input" type="number" step="0.001" min="0" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} /></div>
          <div className="form-group"><label>Estoque mínimo ({form.unit})</label><input className="input" type="number" step="0.001" min="0" value={form.minStock} onChange={e => setForm(f => ({ ...f, minStock: e.target.value }))} /></div>
        </div>
      </Modal>

      <Confirm open={!!confirm} onClose={() => setConfirm(null)} onOk={() => del(confirm)} />
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   CONFECTIONERY – ORDERS
═══════════════════════════════════════════════════════════════════════════ */
function ConfOrders() {
  const { conf, setConf, toast } = useStore();
  const [filterStatus, setFilterStatus] = useState("todos");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ clientId: "", recipeId: "", qty: "1", deliveryDate: "", status: "pendente", price: "", notes: "" });

  const validate = () => {
    const e = {};
    if (!form.clientId) e.clientId = "Selecione o cliente";
    if (!form.recipeId) e.recipeId = "Selecione o produto";
    if (!form.price || parseFloat(form.price) <= 0) e.price = "Informe o preço de venda";
    if (!form.qty || parseFloat(form.qty) <= 0) e.qty = "Quantidade inválida";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const getSelectedProduct = () => conf.ingredients.find(p => p.id === parseInt(form.recipeId));
  const getOrderCost = () => {
    const p = getSelectedProduct();
    return p ? p.costUnit * (parseFloat(form.qty) || 0) : 0;
  };
  const getSuggestedPrice = () => {
    const p = getSelectedProduct();
    return p ? p.precoVenda * (parseFloat(form.qty) || 0) : 0;
  };
  const getEstimatedProfit = () => (parseFloat(form.price) || 0) - getOrderCost();

  const openNew = () => { setEditing(null); setForm({ clientId: "", recipeId: "", qty: "1", deliveryDate: "", status: "pendente", price: "", notes: "" }); setErrors({}); setModal(true); };
  const openEdit = o => { setEditing(o); setForm({ clientId: String(o.clientId), recipeId: String(o.recipeId), qty: String(o.qty), deliveryDate: o.deliveryDate, status: o.status, price: String(o.price), notes: o.notes }); setErrors({}); setModal(true); };

  const save = () => {
    if (!validate()) return;
    const item = { ...form, clientId: parseInt(form.clientId), recipeId: parseInt(form.recipeId), qty: parseFloat(form.qty), price: parseFloat(form.price) };
    if (editing) {
      // Restore old stock, then deduct new
      let ings = restoreStockForOrder(editing.recipeId, editing.qty, conf.recipes, conf.ingredients);
      ings = deductStockForOrder(item.recipeId, item.qty, conf.recipes, ings);
      setConf(c => ({ ...c, orders: c.orders.map(o => o.id === editing.id ? { ...item, id: editing.id, createdAt: o.createdAt } : o), ingredients: ings }));
      toast("Pedido atualizado! Estoque recalculado.", "s");
    } else {
      const id = nextId(conf.orders);
      const ings = deductStockForOrder(item.recipeId, item.qty, conf.recipes, conf.ingredients);
      setConf(c => ({ ...c, orders: [...c.orders, { id, ...item, createdAt: today() }], ingredients: ings }));
      toast("Pedido criado! Estoque atualizado automaticamente.", "s");
    }
    setModal(false);
  };

  const del = id => {
    const ord = conf.orders.find(o => o.id === id);
    if (ord) {
      const ings = restoreStockForOrder(ord.recipeId, ord.qty, conf.recipes, conf.ingredients);
      setConf(c => ({ ...c, orders: c.orders.filter(o => o.id !== id), ingredients: ings }));
      toast("Pedido removido. Estoque restaurado.", "i");
    }
  };

  const updateStatus = (id, status) => {
    setConf(c => ({ ...c, orders: c.orders.map(o => o.id === id ? { ...o, status } : o) }));
    toast(`Status: ${ORDER_STATUS[status]?.label}`, "s");
  };

  const filtered = useMemo(() => conf.orders.filter(o => {
    if (filterStatus !== "todos" && o.status !== filterStatus) return false;
    if (search) {
      const client = conf.clients.find(c => c.id === o.clientId);
      const prod = conf.ingredients.find(p => p.id === o.recipeId);
      const term = search.toLowerCase();
      if (!client?.name.toLowerCase().includes(term) && !prod?.name.toLowerCase().includes(term) && !String(o.id).includes(term)) return false;
    }
    return true;
  }), [conf.orders, conf.clients, conf.recipes, filterStatus, search]);

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Pedidos</h1><p className="page-desc">Ao criar um pedido, o estoque do produto é descontado automaticamente.</p></div>
        <button className="btn btn-primary" onClick={openNew}><Ic n="plus" s={14} /> Novo Pedido</button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        {[["todos", "Todos", conf.orders.length], ...Object.entries(ORDER_STATUS).map(([k, v]) => [k, v.label, conf.orders.filter(o => o.status === k).length])].map(([val, lbl, cnt]) => (
          <button key={val} className={`btn btn-sm ${filterStatus === val ? "btn-primary" : "btn-secondary"}`} onClick={() => setFilterStatus(val)}>
            {lbl} <span style={{ opacity: 0.7, marginLeft: 2 }}>({cnt})</span>
          </button>
        ))}
        <div style={{ marginLeft: "auto" }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Buscar por cliente ou produto..." />
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          {filtered.length === 0
            ? <EmptyState icon="order" title="Nenhum pedido encontrado" desc={search || filterStatus !== "todos" ? "Tente ajustar os filtros." : "Crie o primeiro pedido do seu negócio."} action={!search && filterStatus === "todos" ? "+ Novo Pedido" : null} onAction={openNew} />
            : <table>
              <thead><tr><th>#</th><th>Cliente</th><th>Produto</th><th>Qtd</th><th>Entrega</th><th>Preço</th><th>Custo</th><th>Lucro</th><th>Status</th><th>Ações</th></tr></thead>
              <tbody>
                {filtered.map(ord => {
                  const client = conf.clients.find(c => c.id === ord.clientId);
                  const prod = conf.ingredients.find(p => p.id === ord.recipeId);
                  const cost = prod ? prod.costUnit * ord.qty : 0;
                  const profit = ord.price - cost;
                  const st = ORDER_STATUS[ord.status];
                  const isLate = ord.status !== "entregue" && ord.status !== "cancelado" && ord.deliveryDate < today();
                  return (
                    <tr key={ord.id} style={isLate ? { background: "#FFEBEE" } : {}}>
                      <td style={{ color: "var(--rosa)", fontWeight: 700 }}>#{ord.id}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{client?.name?.split(" ").slice(0, 2).join(" ") || "—"}</div>
                        {isLate && <span className="badge badge-red" style={{ fontSize: 9 }}>ATRASADO</span>}
                      </td>
                      <td style={{ maxWidth: 160 }}>{prod?.name || "—"}</td>
                      <td>{N(ord.qty, 0)}</td>
                      <td style={{ fontSize: 12 }}>{ord.deliveryDate || "—"}</td>
                      <td style={{ fontWeight: 600 }}>{R(ord.price)}</td>
                      <td className="txt-muted">{R(cost)}</td>
                      <td style={{ fontWeight: 600, color: profit >= 0 ? "var(--verde)" : "var(--red)" }}>{R(profit)}</td>
                      <td>
                        <select style={{ border: "none", background: "transparent", fontSize: 12, cursor: "pointer", fontWeight: 600, fontFamily: "'Inter',sans-serif", color: "var(--txt)" }}
                          value={ord.status} onChange={e => updateStatus(ord.id, e.target.value)}>
                          {Object.entries(ORDER_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                        </select>
                      </td>
                      <td>
                        <div className="td-actions">
                          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => openEdit(ord)} title="Editar"><Ic n="edit" s={14} /></button>
                          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setConfirm(ord.id)} style={{ color: "#E74C3C" }} title="Excluir"><Ic n="trash" s={14} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          }
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Editar Pedido" : "Novo Pedido"} size="lg"
        footer={<><button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={save}>{editing ? "Atualizar Pedido" : "Criar Pedido"}</button></>}>

        <div className="alert alert-i" style={{ marginBottom: 14 }}>
          <Ic n="info" s={14} /><span>O estoque será <strong>descontado automaticamente</strong> ao salvar o pedido.</span>
        </div>

        <div className="form-row">
          <div className="form-group"><label>Cliente *</label>
            <select className={`select ${errors.clientId ? "error" : ""}`} value={form.clientId} onChange={e => setForm(f => ({ ...f, clientId: e.target.value }))}>
              <option value="">Selecionar cliente...</option>
              {conf.clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {errors.clientId && <div className="form-error">{errors.clientId}</div>}
          </div>
          <div className="form-group"><label>Produto *</label>
            <select className={`select ${errors.recipeId ? "error" : ""}`} value={form.recipeId} onChange={e => setForm(f => ({ ...f, recipeId: e.target.value }))}>
              <option value="">Selecionar produto...</option>
              {conf.recipes.map(r => <option key={r.id} value={r.id}>{r.emoji} {r.name}</option>)}
            </select>
            {errors.recipeId && <div className="form-error">{errors.recipeId}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group"><label>Quantidade *</label>
            <input className={`input ${errors.qty ? "error" : ""}`} type="number" min="1" step="1" value={form.qty} onChange={e => setForm(f => ({ ...f, qty: e.target.value }))} />
            {errors.qty && <div className="form-error">{errors.qty}</div>}
          </div>
          <div className="form-group"><label>Data de Entrega</label>
            <input className="input" type="date" value={form.deliveryDate} onChange={e => setForm(f => ({ ...f, deliveryDate: e.target.value }))} />
          </div>
        </div>

        {form.recipeId && parseFloat(form.qty) > 0 && (
          <div className="info-box">
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--txt-m)", marginBottom: 8 }}>💡 Análise Automática do Pedido</div>
            <div className="info-row"><span className="lbl">Custo de produção</span><span className="val">{R(getOrderCost())}</span></div>
            <div className="info-row"><span className="lbl">Preço sugerido ({conf.settings.markup || 2.5}× markup)</span><span className="val" style={{ color: "var(--verde)" }}>{R(getSuggestedPrice())}</span></div>
            {form.price && <div className="info-row"><span className="lbl">Lucro estimado</span><span className="val" style={{ color: getEstimatedProfit() >= 0 ? "var(--verde)" : "var(--red)" }}>{R(getEstimatedProfit())}</span></div>}
            {form.price && parseFloat(form.price) < getOrderCost() && <div className="alert alert-e" style={{ margin: "8px 0 0", padding: "8px 10px" }}><Ic n="alert" s={12} /> Preço abaixo do custo! Você terá prejuízo.</div>}
          </div>
        )}

        <div className="form-row">
          <div className="form-group"><label>Preço de Venda (R$) *</label>
            <input className={`input ${errors.price ? "error" : ""}`} type="number" step="0.01" min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="0,00" />
            {errors.price && <div className="form-error">{errors.price}</div>}
            {form.recipeId && form.qty && !form.price && (
              <div className="form-hint" style={{ cursor: "pointer", color: "var(--rosa)", textDecoration: "underline" }} onClick={() => setForm(f => ({ ...f, price: getSuggestedPrice().toFixed(2) }))}>
                Usar preço de tabela: {R(getSuggestedPrice())}
              </div>
            )}
          </div>
          <div className="form-group"><label>Status</label>
            <select className="select" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              {Object.entries(ORDER_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group"><label>Observações</label><textarea className="textarea" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Detalhes especiais do pedido..." /></div>
      </Modal>

      <Confirm open={!!confirm} onClose={() => setConfirm(null)} onOk={() => del(confirm)} msg="Excluir este pedido vai restaurar o estoque do produto." />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONFECTIONERY – STOCK & PURCHASES
═══════════════════════════════════════════════════════════════════════════ */
function ConfStock() {
  const { conf, setConf, toast } = useStore();
  const [tab, setTab] = useState("estoque");
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ ingredientId: "", qty: "", totalCost: "", date: today(), supplier: "", notes: "" });
  const [errors, setErrors] = useState({});

  const lowStock = conf.ingredients.filter(i => i.stock <= i.minStock);
  const totalValue = conf.ingredients.reduce((s, i) => s + i.stock * i.costUnit, 0);

  const validate = () => {
    const e = {};
    if (!form.ingredientId) e.ingredientId = "Selecione o ingrediente";
    if (!form.qty || parseFloat(form.qty) <= 0) e.qty = "Quantidade inválida";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const savePurchase = () => {
    if (!validate()) return;
    const ingId = parseInt(form.ingredientId);
    const qty = parseFloat(form.qty);
    const costPerUnit = form.totalCost && qty > 0 ? parseFloat(form.totalCost) / qty : null;
    setConf(c => ({
      ...c,
      ingredients: c.ingredients.map(i => i.id === ingId ? { ...i, stock: parseFloat((i.stock + qty).toFixed(4)), ...(costPerUnit ? { costUnit: parseFloat(costPerUnit.toFixed(4)) } : {}) } : i),
      purchases: [...c.purchases, { id: nextId(c.purchases), ingredientId: ingId, qty, totalCost: parseFloat(form.totalCost) || 0, date: form.date, supplier: form.supplier, notes: form.notes }],
    }));
    toast("Compra registrada! Estoque atualizado.", "s");
    setModal(false);
    setForm({ ingredientId: "", qty: "", totalCost: "", date: today(), supplier: "", notes: "" });
  };

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Estoque de Produtos</h1><p className="page-desc">Produtos finais vendáveis · Entradas manuais atualizam o estoque</p></div>
        <button className="btn btn-primary" onClick={() => { setErrors({}); setModal(true); }}><Ic n="buy" s={14} /> Registrar Entrada</button>
      </div>

      <div className="g g3 mb-4">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#E3F2FD" }}><Ic n="stock" s={18} c="#1565C0" /></div>
          <div><div className="stat-label">Total Produtos</div><div className="stat-val">{conf.ingredients.length}</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: lowStock.length > 0 ? "#FFEBEE" : "#E8F5E9" }}><Ic n="alert" s={18} c={lowStock.length > 0 ? "#C62828" : "#2E7D32"} /></div>
          <div><div className="stat-label">Produtos Baixo/Crítico</div><div className="stat-val" style={{ color: lowStock.length > 0 ? "var(--red)" : "var(--verde)" }}>{lowStock.length}</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#E8F5E9" }}><Ic n="fin" s={18} c="#2E7D32" /></div>
          <div><div className="stat-label">Valor em Estoque</div><div className="stat-val">{R(totalValue)}</div></div>
        </div>
      </div>

      <div className="tabs">
        {[["estoque", "Produtos em Estoque"], ["compras", "Histórico de Entradas"]].map(([k, v]) => <div key={k} className={`tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{v}</div>)}
      </div>

      {tab === "estoque" && (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Produto</th><th>Categoria</th><th>Custo/Un.</th><th>Preço Venda</th><th>Estoque</th><th>Mínimo</th><th>Cobertura</th><th>Status</th></tr></thead>
              <tbody>
                {conf.ingredients.map(ing => {
                  const st = STOCK_STATUS(ing);
                  const pct = Math.min(ing.stock / Math.max(ing.minStock * 2, 0.001), 1);
                  return (
                    <tr key={ing.id}>
                      <td><div style={{ fontWeight: 600 }}>{ing.name}</div>{ing.obs && <div style={{ fontSize: 11, color: "var(--txt-m)" }}>{ing.obs}</div>}</td>
                      <td><span className="badge badge-brown">{ing.category}</span></td>
                      <td>{R(ing.costUnit)}/{ing.unit}</td>
                      <td style={{ fontWeight: 600, color: "var(--verde)" }}>{R(ing.precoVenda || 0)}/{ing.unit}</td>
                      <td><strong>{N(ing.stock, 0)}</strong> {ing.unit}</td>
                      <td className="txt-muted">{N(ing.minStock, 0)} {ing.unit}</td>
                      <td style={{ minWidth: 90 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div className="progress" style={{ flex: 1 }}><div className="progress-fill" style={{ width: `${pct * 100}%`, background: st.color }} /></div>
                          <span style={{ fontSize: 10, color: "var(--txt-l)", width: 28 }}>{Math.round(pct * 100)}%</span>
                        </div>
                      </td>
                      <td><span className={`badge ${st.cls}`}>{st.label}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "compras" && (
        <div className="card">
          {conf.purchases.length === 0
            ? <EmptyState icon="buy" title="Nenhuma compra registrada" desc="Registre entradas de estoque para manter o controle." action="Registrar Compra" onAction={() => setModal(true)} />
            : <div className="table-wrap">
              <table>
                <thead><tr><th>Data</th><th>Produto</th><th>Qtd. Entrada</th><th>Custo Total</th><th>Custo/Un.</th><th>Observações</th></tr></thead>
                <tbody>
                  {[...conf.purchases].reverse().map(p => {
                    const ing = conf.ingredients.find(i => i.id === p.ingredientId);
                    return (
                      <tr key={p.id}>
                        <td className="txt-muted" style={{ fontSize: 12 }}>{p.date}</td>
                        <td style={{ fontWeight: 500 }}>{ing?.name || "—"}</td>
                        <td>{N(p.qty, 0)} {ing?.unit}</td>
                        <td style={{ fontWeight: 600 }}>{R(p.totalCost)}</td>
                        <td className="txt-muted">{p.qty > 0 && p.totalCost > 0 ? R(p.totalCost / p.qty) + "/" + ing?.unit : "—"}</td>
                        <td className="txt-muted">{p.notes || "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          }
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title="Registrar Entrada de Produto"
        footer={<><button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={savePurchase}>Confirmar Entrada</button></>}>
        <div className="alert alert-i"><Ic n="info" s={14} />O estoque do produto será <strong>aumentado automaticamente</strong>. Se informar o custo total, o custo unitário será recalculado.</div>
        <div className="form-group"><label>Ingrediente *</label>
          <select className={`select ${errors.ingredientId ? "error" : ""}`} value={form.ingredientId} onChange={e => setForm(f => ({ ...f, ingredientId: e.target.value }))}>  
            <option value="">Selecionar produto...</option>
            {conf.ingredients.map(i => <option key={i.id} value={i.id}>{i.name} — estoque atual: {N(i.stock, 0)} {i.unit}</option>)}
          </select>
          {errors.ingredientId && <div className="form-error">{errors.ingredientId}</div>}  
        </div>
        <div className="form-row">
          <div className="form-group"><label>Quantidade comprada *</label>
            <input className={`input ${errors.qty ? "error" : ""}`} type="number" step="0.1" min="0.1" value={form.qty} onChange={e => setForm(f => ({ ...f, qty: e.target.value }))} />
            {errors.qty && <div className="form-error">{errors.qty}</div>}
          </div>
          <div className="form-group"><label>Custo total (R$)</label>
            <input className="input" type="number" step="0.01" min="0" value={form.totalCost} onChange={e => setForm(f => ({ ...f, totalCost: e.target.value }))} placeholder="Opcional" />
            <div className="form-hint">Se informado, atualiza o custo unitário</div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Data da compra</label><input className="input" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
          <div className="form-group"><label>Observações</label><input className="input" value={form.notes || ""} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Nota fiscal, lote, etc." /></div>
        </div>
        <div className="form-group"><label>Observações</label><input className="input" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Nota fiscal, lote, etc." /></div>
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONFECTIONERY – CLIENTS
═══════════════════════════════════════════════════════════════════════════ */
function ConfClients() {
  const { conf, setConf, toast } = useStore();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [viewModal, setViewModal] = useState(null);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", notes: "" });

  const filtered = useMemo(() => conf.clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  ), [conf.clients, search]);

  const openNew = () => { setEditing(null); setForm({ name: "", phone: "", email: "", address: "", notes: "" }); setErrors({}); setModal(true); };
  const openEdit = c => { setEditing(c); setForm({ name: c.name, phone: c.phone, email: c.email, address: c.address, notes: c.notes }); setErrors({}); setModal(true); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nome obrigatório";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const save = () => {
    if (!validate()) return;
    if (editing) {
      setConf(c => ({ ...c, clients: c.clients.map(cl => cl.id === editing.id ? { ...form, id: editing.id } : cl) }));
      toast("Cliente atualizado!", "s");
    } else {
      const id = nextId(conf.clients);
      setConf(c => ({ ...c, clients: [...c.clients, { id, ...form }] }));
      toast("Cliente cadastrado!", "s");
    }
    setModal(false);
  };

  const del = id => { setConf(c => ({ ...c, clients: c.clients.filter(cl => cl.id !== id) })); toast("Cliente removido.", "i"); };

  const clientOrders = (clientId) => conf.orders.filter(o => o.clientId === clientId);
  const clientRevenue = (clientId) => clientOrders(clientId).filter(o => o.status !== "cancelado").reduce((s, o) => s + o.price, 0);

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Clientes</h1><p className="page-desc">{conf.clients.length} clientes cadastrados</p></div>
        <button className="btn btn-primary" onClick={openNew}><Ic n="plus" s={14} /> Novo Cliente</button>
      </div>

      <div className="card">
        <div className="card-head">
          <SearchBar value={search} onChange={setSearch} placeholder="Buscar por nome, e-mail ou telefone..." />
        </div>
        <div className="table-wrap">
          {filtered.length === 0
            ? <EmptyState icon="client" title="Nenhum cliente" desc="Cadastre clientes para associar aos pedidos." action="+ Novo Cliente" onAction={openNew} />
            : <table>
              <thead><tr><th>Cliente</th><th>Contato</th><th>Pedidos</th><th>Total Gasto</th><th>Ações</th></tr></thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="avatar" style={{ width: 30, height: 30, fontSize: 12 }}>{c.name[0]}</div>
                        <div><div style={{ fontWeight: 600 }}>{c.name}</div><div style={{ fontSize: 11, color: "var(--txt-m)" }}>{c.address?.split(" - ")[1] || ""}</div></div>
                      </div>
                    </td>
                    <td><div style={{ fontSize: 12 }}>{c.phone}</div><div style={{ fontSize: 11, color: "var(--txt-m)" }}>{c.email}</div></td>
                    <td><span className="badge badge-pink">{clientOrders(c.id).length}</span></td>
                    <td style={{ fontWeight: 600 }}>{R(clientRevenue(c.id))}</td>
                    <td>
                      <div className="td-actions">
                        <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setViewModal(c)} title="Ver histórico"><Ic n="eye" s={14} /></button>
                        <button className="btn btn-ghost btn-icon btn-sm" onClick={() => openEdit(c)} title="Editar"><Ic n="edit" s={14} /></button>
                        <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setConfirm(c.id)} style={{ color: "#E74C3C" }} title="Excluir"><Ic n="trash" s={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      </div>

      {viewModal && (
        <Modal open={true} onClose={() => setViewModal(null)} title={`👤 ${viewModal.name}`} size="lg"
          footer={<><button className="btn btn-secondary" onClick={() => setViewModal(null)}>Fechar</button><button className="btn btn-primary" onClick={() => { openEdit(viewModal); setViewModal(null); }}>Editar</button></>}>
          <div className="g g3 mb-4">
            {[{ l: "Pedidos", v: clientOrders(viewModal.id).length }, { l: "Total Gasto", v: R(clientRevenue(viewModal.id)) }, { l: "Ticket Médio", v: clientOrders(viewModal.id).length > 0 ? R(clientRevenue(viewModal.id) / clientOrders(viewModal.id).length) : R(0) }].map((s, i) => (
              <div key={i} style={{ background: "var(--bg)", padding: 12, borderRadius: "var(--radius)", textAlign: "center" }}>
                <div className="txt-sm txt-muted">{s.l}</div><div style={{ fontWeight: 700, fontSize: 16, fontFamily: "'Poppins',sans-serif" }}>{s.v}</div>
              </div>
            ))}
          </div>
          {viewModal.notes && <div className="alert alert-i" style={{ marginBottom: 14 }}><Ic n="info" s={14} />{viewModal.notes}</div>}
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Histórico de Pedidos</div>
          {clientOrders(viewModal.id).length === 0
            ? <p className="txt-muted" style={{ fontSize: 13 }}>Nenhum pedido ainda.</p>
            : <div className="table-wrap"><table>
              <thead><tr><th>#</th><th>Produto</th><th>Qtd</th><th>Entrega</th><th>Valor</th><th>Status</th></tr></thead>
              <tbody>
                {clientOrders(viewModal.id).map(ord => {
                  const prod = conf.ingredients.find(x => x.id === ord.recipeId);
                  const st = ORDER_STATUS[ord.status];
                  return <tr key={ord.id}>
                    <td style={{ color: "var(--rosa)", fontWeight: 700 }}>#{ord.id}</td>
                    <td>{prod?.name || "—"}</td>
                    <td>{ord.qty}</td>
                    <td style={{ fontSize: 12 }}>{ord.deliveryDate || "—"}</td>
                    <td style={{ fontWeight: 600 }}>{R(ord.price)}</td>
                    <td><span className={`badge ${st?.cls}`}>{st?.label}</span></td>
                  </tr>;
                })}
              </tbody>
            </table></div>
          }
        </Modal>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Editar Cliente" : "Novo Cliente"}
        footer={<><button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Salvar Cliente</button></>}>
        <div className="form-group"><label>Nome *</label><input className={`input ${errors.name ? "error" : ""}`} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nome completo ou razão social" />{errors.name && <div className="form-error">{errors.name}</div>}</div>
        <div className="form-row">
          <div className="form-group"><label>Telefone</label><input className="input" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(00) 00000-0000" /></div>
          <div className="form-group"><label>E-mail</label><input className="input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
        </div>
        <div className="form-group"><label>Endereço</label><input className="input" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Rua, número — Cidade" /></div>
        <div className="form-group"><label>Observações internas</label><textarea className="textarea" style={{ minHeight: 60 }} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Preferências, restrições alimentares, etc." /></div>
      </Modal>

      <Confirm open={!!confirm} onClose={() => setConfirm(null)} onOk={() => del(confirm)} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATE FILTER HOOK — shared by Financial + Reports
═══════════════════════════════════════════════════════════════════════════ */
function useDateFilter() {
  const [preset, setPresetRaw] = useState("month");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo]   = useState("");

  const { from, to, label } = useMemo(() => {
    const d  = new Date();
    const pad = n => String(n).padStart(2, "0");
    const iso = dt => `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}`;

    const today = iso(d);

    if (preset === "today") {
      return { from: today, to: today, label: "Hoje" };
    }
    if (preset === "yesterday") {
      const y = new Date(d); y.setDate(y.getDate() - 1);
      return { from: iso(y), to: iso(y), label: "Ontem" };
    }
    if (preset === "7d") {
      const s = new Date(d); s.setDate(s.getDate() - 6);
      return { from: iso(s), to: today, label: "Últimos 7 dias" };
    }
    if (preset === "30d") {
      const s = new Date(d); s.setDate(s.getDate() - 29);
      return { from: iso(s), to: today, label: "Últimos 30 dias" };
    }
    if (preset === "month") {
      const s = new Date(d.getFullYear(), d.getMonth(), 1);
      return { from: iso(s), to: today, label: "Mês atual" };
    }
    if (preset === "last_month") {
      const s = new Date(d.getFullYear(), d.getMonth() - 1, 1);
      const e = new Date(d.getFullYear(), d.getMonth(), 0);
      return { from: iso(s), to: iso(e), label: "Mês anterior" };
    }
    if (preset === "year") {
      const s = new Date(d.getFullYear(), 0, 1);
      return { from: iso(s), to: today, label: "Este ano" };
    }
    if (preset === "custom") {
      const lbl = customFrom && customTo ? `${customFrom} → ${customTo}` : "Período personalizado";
      return { from: customFrom, to: customTo, label: lbl };
    }
    return { from: "", to: "", label: "Todos os períodos" };
  }, [preset, customFrom, customTo]);

  const setPreset = (p) => { setPresetRaw(p); };

  const inRange = useCallback((dateStr) => {
    if (!from && !to) return true;
    if (!dateStr) return false;
    if (from && dateStr < from) return false;
    if (to   && dateStr > to)   return false;
    return true;
  }, [from, to]);

  const DateFilterBar = useCallback(() => {
    const PRESETS = [
      ["today",      "Hoje"],
      ["yesterday",  "Ontem"],
      ["7d",         "7 dias"],
      ["30d",        "30 dias"],
      ["month",      "Mês atual"],
      ["last_month", "Mês anterior"],
      ["year",       "Este ano"],
      ["all",        "Todo período"],
      ["custom",     "Personalizado"],
    ];
    return (
      <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "12px 14px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <Ic n="calendar" s={14} c="var(--txt-m)" />
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--txt-m)", marginRight: 4, whiteSpace: "nowrap" }}>Período:</span>
          {PRESETS.map(([v, l]) => (
            <button key={v}
              onClick={() => setPreset(v)}
              style={{
                padding: "4px 11px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                border: `1.5px solid ${preset === v ? "var(--rosa)" : "var(--border)"}`,
                background: preset === v ? "var(--rosa-l)" : "var(--white)",
                color: preset === v ? "var(--rosa-d)" : "var(--txt-m)",
                cursor: "pointer", transition: "all .15s", whiteSpace: "nowrap",
              }}>
              {l}
            </button>
          ))}
        </div>
        {preset === "custom" && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "var(--txt-m)", fontWeight: 600 }}>De:</span>
            <input type="date" className="input" style={{ width: 150 }} value={customFrom} onChange={e => setCustomFrom(e.target.value)} />
            <span style={{ fontSize: 12, color: "var(--txt-m)", fontWeight: 600 }}>Até:</span>
            <input type="date" className="input" style={{ width: 150 }} value={customTo}   onChange={e => setCustomTo(e.target.value)} />
            {(customFrom || customTo) && (
              <button className="btn btn-ghost btn-sm" onClick={() => { setCustomFrom(""); setCustomTo(""); }} style={{ color: "var(--txt-m)" }}>
                <Ic n="x" s={13} /> Limpar
              </button>
            )}
          </div>
        )}
        {preset !== "custom" && from && (
          <div style={{ marginTop: 8, fontSize: 11, color: "var(--txt-m)" }}>
            📅 {from === to ? from : `${from} até ${to}`}
          </div>
        )}
      </div>
    );
  }, [preset, customFrom, customTo]);

  return { preset, from, to, label, inRange, DateFilterBar };
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONFECTIONERY – FINANCIAL
═══════════════════════════════════════════════════════════════════════════ */
function ConfFinancial() {
  const { conf } = useStore();
  const { orders, ingredients } = conf;
  const { label, inRange, DateFilterBar } = useDateFilter();
  const [typeFilter, setTypeFilter] = useState("all"); // all | in | out

  // Apply date range filter (by deliveryDate for orders)
  const valid = useMemo(() =>
    orders.filter(o =>
      o.status !== "cancelado" &&
      inRange(o.deliveryDate || o.createdAt)
    ),
  [orders, inRange]);

  const revenue = useMemo(() => valid.reduce((s, o) => s + o.price, 0), [valid]);
  const costs   = useMemo(() => valid.reduce((s, o) => {
    const p = ingredients.find(x => x.id === o.recipeId);
    return s + (p ? p.costUnit * o.qty : 0);
  }, 0), [valid, ingredients]);
  const profit = revenue - costs;
  const margin = revenue > 0 ? (profit / revenue * 100).toFixed(1) : 0;

  const byProduct = useMemo(() => ingredients.map(p => {
    const pOrds = valid.filter(o => o.recipeId === p.id);
    const rev  = pOrds.reduce((s, o) => s + o.price, 0);
    const cost = pOrds.reduce((s, o) => s + p.costUnit * o.qty, 0);
    return { ...p, rev, cost, profit: rev - cost, qty: pOrds.reduce((s, o) => s + o.qty, 0) };
  }).filter(p => p.rev > 0 || p.qty > 0).sort((a, b) => b.profit - a.profit),
  [valid, ingredients]);

  // Lançamentos sintéticos: entrada de venda + custo do produto
  const ledger = useMemo(() => {
    const rows = [];
    valid.forEach(o => {
      const client = conf.clients.find(c => c.id === o.clientId);
      const prod   = ingredients.find(p => p.id === o.recipeId);
      const cost   = prod ? prod.costUnit * o.qty : 0;
      rows.push({ id: `in-${o.id}`, date: o.deliveryDate || o.createdAt, desc: `Venda — ${prod?.name || "Produto"}`, client: client?.name || "—", type: "in", value: o.price, status: o.status });
      if (cost > 0) rows.push({ id: `out-${o.id}`, date: o.deliveryDate || o.createdAt, desc: `Custo — ${prod?.name || ""}`, client: "—", type: "out", value: cost, status: o.status });
    });
    return rows.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  }, [valid, conf.clients, ingredients]);

  const filteredLedger = useMemo(() =>
    typeFilter === "all" ? ledger : ledger.filter(r => r.type === typeFilter),
  [ledger, typeFilter]);

  const chartData = useMemo(() => {
    const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
    const map = {};
    valid.forEach(o => {
      if (!o.deliveryDate) return;
      const m = new Date(o.deliveryDate + "T00:00:00").getMonth();
      if (!map[m]) map[m] = { l: months[m], v: 0 };
      map[m].v += o.price;
    });
    return Object.values(map);
  }, [valid]);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Financeiro</h1>
          <p className="page-desc">Calculado automaticamente · <strong>{label}</strong></p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => window.print()} style={{ color: "var(--txt-m)" }}>
          <Ic n="dl" s={13} /> Exportar
        </button>
      </div>

      <DateFilterBar />

      <div className="g g4 mb-4">
        {[
          { label: "Receita no período",  val: R(revenue), color: "var(--rosa)", icon: "fin",     bg: "#FCE4EC" },
          { label: "Custo de produção",   val: R(costs),   color: "var(--red)",  icon: "buy",     bg: "#FFEBEE" },
          { label: "Lucro líquido",       val: R(profit),  color: profit >= 0 ? "var(--verde)" : "var(--red)", icon: "trend", bg: profit >= 0 ? "#E8F5E9" : "#FFEBEE" },
          { label: "Margem de lucro",     val: `${margin}%`, color: "var(--ouro)", icon: "metrics", bg: "#FFF8E1" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}><Ic n={s.icon} s={18} c={s.color} /></div>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-val" style={{ color: s.color, fontSize: 20 }}>{s.val}</div>
            </div>
          </div>
        ))}
      </div>

      {chartData.length > 0 && (
        <div className="card mb-4">
          <div className="card-head"><span className="card-title">Receita por mês</span></div>
          <div className="card-body" style={{ paddingTop: 8 }}>
            <MiniBarChart data={chartData} color="var(--rosa)" />
          </div>
        </div>
      )}

      <div className="g g2 mb-4">
        <div className="card">
          <div className="card-head"><span className="card-title">Lucro por Produto</span></div>
          <div className="card-body" style={{ paddingTop: 8 }}>
            {byProduct.length === 0
              ? <p style={{ fontSize: 13, color: "var(--txt-m)", textAlign: "center", padding: "12px 0" }}>Sem dados no período</p>
              : <MiniBarChart data={byProduct.map(r => ({ l: r.name.split(" ")[0], v: Math.max(r.profit, 0) }))} color="#2ECC71" />
            }
          </div>
        </div>
        <div className="card">
          <div className="card-head"><span className="card-title">Resumo do período</span></div>
          <div className="card-body" style={{ padding: "0 20px" }}>
            {[
              ["Pedidos no período",   valid.length, null],
              ["Receita bruta",        R(revenue),   "var(--verde)"],
              ["Custo total",          R(costs),     "var(--red)"],
              ["Lucro líquido",        R(profit),    profit >= 0 ? "var(--verde)" : "var(--red)"],
              ["Margem média",         `${margin}%`, parseFloat(margin) >= 40 ? "var(--verde)" : parseFloat(margin) >= 20 ? "var(--ouro)" : "var(--red)"],
              ["Ticket médio",         valid.length > 0 ? R(revenue / valid.length) : R(0), null],
            ].map(([lbl, val, color], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: i < 5 ? "1px solid var(--border)" : "none" }}>
                <span style={{ fontSize: 13, color: "var(--txt-m)" }}>{lbl}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: color || "var(--choc)", fontFamily: "'Poppins',sans-serif" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-head">
          <span className="card-title">Detalhamento por Produto</span>
        </div>
        <div className="table-wrap">
          {byProduct.length === 0
            ? <EmptyState icon="fin" title="Sem dados no período" desc="Ajuste o filtro de datas ou crie pedidos." />
            : <table>
              <thead><tr><th>Produto</th><th>Qtd.</th><th>Receita</th><th>Custo</th><th>Lucro</th><th>Margem</th></tr></thead>
              <tbody>
                {byProduct.map((r, i) => {
                  const m = r.rev > 0 ? (r.profit / r.rev * 100).toFixed(1) : 0;
                  return (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{r.name}</td>
                      <td>{N(r.qty, 0)}</td>
                      <td style={{ fontWeight: 600 }}>{R(r.rev)}</td>
                      <td className="txt-muted">{R(r.cost)}</td>
                      <td style={{ fontWeight: 700, color: r.profit >= 0 ? "var(--verde)" : "var(--red)" }}>{R(r.profit)}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div className="progress" style={{ width: 60 }}><div className="progress-fill" style={{ width: `${Math.min(m, 100)}%`, background: m >= 40 ? "var(--verde)" : m >= 20 ? "var(--ouro)" : "var(--red)" }} /></div>
                          <span style={{ fontSize: 12, fontWeight: 600 }}>{m}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          }
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-title">Lançamentos do período</span>
          <div style={{ display: "flex", gap: 6 }}>
            {[["all", "Todos"], ["in", "Entradas"], ["out", "Saídas"]].map(([v, l]) => (
              <button key={v}
                onClick={() => setTypeFilter(v)}
                style={{
                  padding: "3px 10px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                  border: `1.5px solid ${typeFilter === v ? "var(--rosa)" : "var(--border)"}`,
                  background: typeFilter === v ? "var(--rosa-l)" : "var(--white)",
                  color: typeFilter === v ? "var(--rosa-d)" : "var(--txt-m)",
                  cursor: "pointer",
                }}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="table-wrap">
          {filteredLedger.length === 0
            ? <EmptyState icon="fin" title="Nenhum lançamento" desc="Sem lançamentos para o filtro selecionado." />
            : <table>
              <thead><tr><th>Data</th><th>Descrição</th><th>Cliente/Origem</th><th>Tipo</th><th>Valor</th></tr></thead>
              <tbody>
                {filteredLedger.map(row => (
                  <tr key={row.id}>
                    <td style={{ fontSize: 12, color: "var(--txt-m)", whiteSpace: "nowrap" }}>{row.date || "—"}</td>
                    <td style={{ fontWeight: 500 }}>{row.desc}</td>
                    <td style={{ fontSize: 12, color: "var(--txt-m)" }}>{row.client}</td>
                    <td>
                      {row.type === "in"
                        ? <span className="badge badge-green">Entrada</span>
                        : <span className="badge badge-red">Saída</span>}
                    </td>
                    <td style={{ fontWeight: 700, color: row.type === "in" ? "var(--verde)" : "var(--red)" }}>
                      {row.type === "in" ? "+" : "−"}{R(row.value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
        {filteredLedger.length > 0 && (
          <div style={{ padding: "12px 20px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: 20 }}>
            <span style={{ fontSize: 13 }}>
              Total entradas: <strong style={{ color: "var(--verde)" }}>{R(filteredLedger.filter(r => r.type === "in").reduce((s, r) => s + r.value, 0))}</strong>
            </span>
            <span style={{ fontSize: 13 }}>
              Total saídas: <strong style={{ color: "var(--red)" }}>{R(filteredLedger.filter(r => r.type === "out").reduce((s, r) => s + r.value, 0))}</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONFECTIONERY – REPORTS
═══════════════════════════════════════════════════════════════════════════ */
function ConfReports() {
  const { conf } = useStore();
  const [tab, setTab] = useState("produtos");
  const [search, setSearch] = useState("");
  const { label, inRange, DateFilterBar } = useDateFilter();

  // Date-filtered valid orders
  const valid = useMemo(() =>
    conf.orders.filter(o =>
      o.status !== "cancelado" &&
      inRange(o.deliveryDate || o.createdAt)
    ),
  [conf.orders, inRange]);

  // Tabs that use date filter
  const DATE_SENSITIVE = ["produtos", "lucro", "clientes", "pedidos"];
  const showDateFilter = DATE_SENSITIVE.includes(tab);

  const topProducts = useMemo(() => conf.ingredients.map(p => ({
    ...p,
    qty:     valid.filter(o => o.recipeId === p.id).reduce((s, o) => s + o.qty, 0),
    revenue: valid.filter(o => o.recipeId === p.id).reduce((s, o) => s + o.price, 0),
    cost:    valid.filter(o => o.recipeId === p.id).reduce((s, o) => s + p.costUnit * o.qty, 0),
  })).filter(p => p.qty > 0 || p.revenue > 0).sort((a, b) => b.qty - a.qty),
  [valid, conf.ingredients]);

  const topClients = useMemo(() => conf.clients.map(c => ({
    ...c,
    orderCount: valid.filter(o => o.clientId === c.id).length,
    total:      valid.filter(o => o.clientId === c.id).reduce((s, o) => s + o.price, 0),
  })).filter(c => c.orderCount > 0).sort((a, b) => b.total - a.total),
  [valid, conf.clients]);

  // Consumo não se aplica mais (estoque direto de produtos)
  const ingConsumption = useMemo(() => [], []);

  const critical = conf.ingredients.filter(i => i.stock <= i.minStock * 0.5);

  // Filtered orders for "pedidos" tab
  const filteredOrders = useMemo(() => {
    if (!search) return valid;
    const s = search.toLowerCase();
    return valid.filter(o => {
      const client = conf.clients.find(c => c.id === o.clientId);
      const prod = conf.ingredients.find(p => p.id === o.recipeId);
      return client?.name?.toLowerCase().includes(s) || prod?.name?.toLowerCase().includes(s) || String(o.id).includes(s);
    });
  }, [valid, search, conf.clients, conf.ingredients]);

  const TABS = [
    ["produtos", "Mais Vendidos"],
    ["lucro",    "Lucro por Produto"],
    ["clientes", "Top Clientes"],
    ["pedidos",  "Lista de Pedidos"],
    ["criticos", "Estoque Crítico"],
  ];

  const periodLabel = label;
  const totalRevenue = valid.reduce((s, o) => s + o.price, 0);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Relatórios</h1>
          <p className="page-desc">Dados reais do sistema · <strong>{periodLabel}</strong></p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => window.print()} style={{ color: "var(--txt-m)" }}>
          <Ic n="dl" s={13} /> Exportar
        </button>
      </div>

      <div className="tabs" style={{ flexWrap: "wrap" }}>
        {TABS.map(([k, v]) => (
          <div key={k} className={`tab ${tab === k ? "active" : ""}`} onClick={() => { setTab(k); setSearch(""); }}>{v}</div>
        ))}
      </div>

      {showDateFilter && <DateFilterBar />}

      {/* ── MAIS VENDIDOS ── */}
      {tab === "produtos" && (
        <div>
          {topProducts.length === 0
            ? <div className="card"><EmptyState icon="report" title="Sem dados no período" desc="Ajuste o filtro de datas ou crie pedidos." /></div>
            : <>
              <div className="card mb-4">
                <div className="card-head">
                  <span className="card-title">Produtos mais vendidos — {periodLabel}</span>
                  <span style={{ fontSize: 12, color: "var(--txt-m)" }}>Receita total: <strong style={{ color: "var(--verde)" }}>{R(totalRevenue)}</strong></span>
                </div>
                <div className="card-body" style={{ paddingTop: 8 }}>
                  <MiniBarChart data={topProducts.slice(0, 6).map(r => ({ l: r.name.split(" ")[0], v: r.qty }))} color="var(--rosa)" />
                </div>
              </div>
              <div className="card">
                <div className="table-wrap"><table>
                  <thead><tr><th>#</th><th>Produto</th><th>Qtd. Vendida</th><th>Receita</th><th>% da receita</th></tr></thead>
                  <tbody>{topProducts.map((r, i) => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 700, color: "var(--rosa)" }}>{["🥇","🥈","🥉"][i] || `#${i+1}`}</td>
                      <td style={{ fontWeight: 600 }}>{r.name}</td>
                      <td style={{ fontWeight: 700 }}>{N(r.qty, 0)}</td>
                      <td style={{ fontWeight: 700, color: "var(--verde)" }}>{R(r.revenue)}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div className="progress" style={{ width: 70 }}>
                            <div className="progress-fill" style={{ width: `${totalRevenue > 0 ? (r.revenue / totalRevenue * 100).toFixed(0) : 0}%`, background: "var(--rosa)" }} />
                          </div>
                          <span style={{ fontSize: 11 }}>{totalRevenue > 0 ? (r.revenue / totalRevenue * 100).toFixed(1) : 0}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}</tbody>
                </table></div>
              </div>
            </>
          }
        </div>
      )}

      {/* ── LUCRO POR PRODUTO ── */}
      {tab === "lucro" && (
        <div className="card">
          {topProducts.length === 0
            ? <EmptyState icon="fin" title="Sem dados no período" desc="Ajuste o filtro de datas." />
            : <div className="table-wrap"><table>
              <thead><tr><th>Produto</th><th>Qtd.</th><th>Receita</th><th>Custo</th><th>Lucro</th><th>Margem</th></tr></thead>
              <tbody>{topProducts.slice().sort((a, b) => (b.revenue - b.cost) - (a.revenue - a.cost)).map(r => {
                const prof = r.revenue - r.cost;
                const m    = r.revenue > 0 ? (prof / r.revenue * 100).toFixed(1) : 0;
                return (
                  <tr key={r.id}>
                    <td style={{ fontWeight: 600 }}>{r.name}</td>
                    <td>{N(r.qty, 0)}</td>
                    <td style={{ fontWeight: 600 }}>{R(r.revenue)}</td>
                    <td className="txt-muted">{R(r.cost)}</td>
                    <td style={{ color: prof >= 0 ? "var(--verde)" : "var(--red)", fontWeight: 700 }}>{R(prof)}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div className="progress" style={{ width: 60 }}>
                          <div className="progress-fill" style={{ width: `${Math.min(m, 100)}%`, background: m >= 40 ? "var(--verde)" : m >= 20 ? "var(--ouro)" : "var(--red)" }} />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: 12 }}>{m}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}</tbody>
            </table></div>
          }
        </div>
      )}

      {/* ── TOP CLIENTES ── */}
      {tab === "clientes" && (
        <div className="card">
          {topClients.length === 0
            ? <EmptyState icon="client" title="Sem dados no período" desc="Ajuste o filtro de datas." />
            : <div className="table-wrap"><table>
              <thead><tr><th>Cliente</th><th>Pedidos</th><th>Total Gasto</th><th>Ticket Médio</th><th>% da receita</th></tr></thead>
              <tbody>{topClients.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="avatar" style={{ width: 28, height: 28, fontSize: 11 }}>{c.name[0]}</div>
                      <strong>{c.name}</strong>
                    </div>
                  </td>
                  <td><span className="badge badge-pink">{c.orderCount}</span></td>
                  <td style={{ fontWeight: 700 }}>{R(c.total)}</td>
                  <td>{c.orderCount > 0 ? R(c.total / c.orderCount) : "—"}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div className="progress" style={{ width: 60 }}>
                        <div className="progress-fill" style={{ width: `${totalRevenue > 0 ? (c.total / totalRevenue * 100).toFixed(0) : 0}%`, background: "var(--rosa)" }} />
                      </div>
                      <span style={{ fontSize: 11 }}>{totalRevenue > 0 ? (c.total / totalRevenue * 100).toFixed(1) : 0}%</span>
                    </div>
                  </td>
                </tr>
              ))}</tbody>
            </table></div>
          }
        </div>
      )}


      {/* ── LISTA DE PEDIDOS ── */}
      {tab === "pedidos" && (
        <div className="card">
          <div className="card-head">
            <span className="card-title">Pedidos — {periodLabel} ({valid.length})</span>
            <SearchBar value={search} onChange={setSearch} placeholder="Buscar cliente ou produto..." />
          </div>
          {filteredOrders.length === 0
            ? <EmptyState icon="order" title="Nenhum pedido encontrado" desc="Ajuste o período ou o termo de busca." />
            : <div className="table-wrap"><table>
              <thead><tr><th>#</th><th>Cliente</th><th>Produto</th><th>Qtd</th><th>Data entrega</th><th>Valor</th><th>Lucro est.</th><th>Status</th></tr></thead>
              <tbody>{filteredOrders.map(ord => {
                const client = conf.clients.find(c => c.id === ord.clientId);
                const prod = conf.ingredients.find(p => p.id === ord.recipeId);
                const cost   = prod ? prod.costUnit * ord.qty : 0;
                const st     = ORDER_STATUS[ord.status];
                return (
                  <tr key={ord.id}>
                    <td style={{ color: "var(--rosa)", fontWeight: 700 }}>#{ord.id}</td>
                    <td style={{ fontWeight: 600 }}>{client?.name?.split(" ").slice(0,2).join(" ") || "—"}</td>
                    <td>{prod?.name || "—"}</td>
                    <td>{N(ord.qty, 0)}</td>
                    <td style={{ fontSize: 12 }}>{ord.deliveryDate || "—"}</td>
                    <td style={{ fontWeight: 600 }}>{R(ord.price)}</td>
                    <td style={{ fontWeight: 600, color: (ord.price - cost) >= 0 ? "var(--verde)" : "var(--red)" }}>{R(ord.price - cost)}</td>
                    <td>{st && <span className={`badge ${st.cls}`}>{st.label}</span>}</td>
                  </tr>
                );
              })}</tbody>
            </table></div>
          }
          {filteredOrders.length > 0 && (
            <div style={{ padding: "10px 20px", borderTop: "1px solid var(--border)", display: "flex", gap: 20, justifyContent: "flex-end" }}>
              <span style={{ fontSize: 13 }}>Total: <strong style={{ color: "var(--verde)" }}>{R(filteredOrders.reduce((s, o) => s + o.price, 0))}</strong></span>
              <span style={{ fontSize: 13 }}>{filteredOrders.length} pedido(s)</span>
            </div>
          )}
        </div>
      )}

      {/* ── ESTOQUE CRÍTICO (sem filtro de data) ── */}
      {tab === "criticos" && (
        <div>
          <div className="alert alert-w mb-4">
            <Ic n="alert" s={14} />
            <span>Este relatório reflete o <strong>estado atual do estoque</strong>, independente do período selecionado.</span>
          </div>
          <div className="card">
            {critical.length === 0
              ? <EmptyState icon="check" title="Nenhum produto crítico" desc="Todos os produtos estão com estoque acima do mínimo." />
              : <div className="table-wrap"><table>
                <thead><tr><th>Produto</th><th>Estoque Atual</th><th>Mínimo</th><th>Faltando</th><th>Custo p/ repor</th><th>Status</th></tr></thead>
                <tbody>{critical.map(i => {
                  const lacking = Math.max(0, i.minStock - i.stock);
                  return (
                    <tr key={i.id}>
                      <td><strong>{i.name}</strong></td>
                      <td style={{ color: "var(--red)", fontWeight: 700 }}>{N(i.stock)} {i.unit}</td>
                      <td>{N(i.minStock)} {i.unit}</td>
                      <td style={{ color: "var(--red)", fontWeight: 600 }}>{N(lacking)} {i.unit}</td>
                      <td style={{ fontWeight: 600 }}>{R(lacking * i.costUnit)}</td>
                      <td><span className={`badge ${STOCK_STATUS(i).cls}`}>{STOCK_STATUS(i).label}</span></td>
                    </tr>
                  );
                })}</tbody>
              </table></div>
            }
            {critical.length > 0 && (
              <div style={{ padding: "10px 20px", borderTop: "1px solid var(--border)", fontSize: 13 }}>
                Custo total estimado para repor estoque mínimo: <strong style={{ color: "var(--red)" }}>
                  {R(critical.reduce((s, i) => s + Math.max(0, i.minStock - i.stock) * i.costUnit, 0))}
                </strong>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONFECTIONERY – SETTINGS
═══════════════════════════════════════════════════════════════════════════ */
function ConfSettings({ onLogout }) {
  const { conf, setConf, toast } = useStore();
  const [form, setForm] = useState({ ...conf.settings });
  const save = () => {
    setConf(c => ({ ...c, settings: { ...form, markup: parseFloat(form.markup) || 2.5 } }));
    toast("Configurações salvas!", "s");
  };
  return (
    <div>
      <div className="page-header"><h1 className="page-title">Configurações</h1><p className="page-desc">Personalize as informações do seu negócio</p></div>
      <div className="g g2">
        <div className="card">
          <div className="card-head"><span className="card-title">Dados do Negócio</span></div>
          <div className="card-body">
            <div className="form-group"><label>Nome do Negócio</label><input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="form-group"><label>Proprietário</label><input className="input" value={form.owner} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))} /></div>
            <div className="form-row">
              <div className="form-group"><label>Telefone</label><input className="input" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
              <div className="form-group"><label>E-mail</label><input className="input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
            </div>
            <div className="form-group"><label>Endereço</label><input className="input" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} /></div>
            <button className="btn btn-primary btn-full" onClick={save}>Salvar Configurações</button>
          </div>
        </div>
        <div>
          <div className="card mb-4">
            <div className="card-head"><span className="card-title">Precificação</span></div>
            <div className="card-body">
              <div className="form-group">
                <label>Markup padrão (multiplicador de custo)</label>
                <input className="input" type="number" step="0.1" min="1" value={form.markup} onChange={e => setForm(f => ({ ...f, markup: e.target.value }))} />
                <div className="form-hint">Custo {R(10)} × {form.markup} = preço sugerido {R(10 * (parseFloat(form.markup) || 2.5))}</div>
              </div>
              <div className="alert alert-i">
                <Ic n="info" s={14} />Markup {form.markup}× = margem de {((1 - 1 / Math.max(parseFloat(form.markup) || 2.5, 1)) * 100).toFixed(0)}%
              </div>
              <div className="alert alert-w"><Ic n="alert" s={14} />Esta configuração afeta o preço sugerido em <strong>todos os pedidos</strong>.</div>
              <button className="btn btn-primary btn-full" onClick={save}>Salvar</button>
            </div>
          </div>
          <div className="card">
            <div className="card-body" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div><div style={{ fontWeight: 600 }}>Sair da conta</div><div style={{ fontSize: 12, color: "var(--txt-m)" }}>Você será redirecionado para o login</div></div>
              <button className="btn btn-danger" onClick={onLogout}><Ic n="logout" s={14} /> Sair</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONFECTIONERY SHELL
═══════════════════════════════════════════════════════════════════════════ */
function ConfApp({ user, onLogout }) {
  const [page, setPage] = useState("dash");
  const { conf } = useStore();

  const lowStockCount = conf.ingredients.filter(p => p.minStock > 0 && p.stock <= p.minStock).length;
  const activeOrders = conf.orders.filter(o => ["pendente", "producao"].includes(o.status)).length;
  const lateOrders = conf.orders.filter(o => o.status !== "entregue" && o.status !== "cancelado" && o.deliveryDate < today()).length;

  const nav = [
    { id: "dash", label: "Dashboard", icon: "dash", group: "VISÃO GERAL" },
    { id: "orders", label: "Pedidos", icon: "order", badge: activeOrders > 0 ? activeOrders : null, group: "OPERAÇÕES" },
    { id: "stock", label: "Estoque de Produtos", icon: "stock", badge: lowStockCount > 0 ? lowStockCount : null },
    { id: "clients", label: "Clientes", icon: "client", group: "RELACIONAMENTO" },
    { id: "financial", label: "Financeiro", icon: "fin", group: "ANÁLISE" },
    { id: "reports", label: "Relatórios", icon: "report" },
    { id: "settings", label: "Configurações", icon: "cfg", group: "SISTEMA" },
  ];

  const PAGES = {
    dash: <ConfDash setPage={setPage} />,
    orders: <ConfOrders />,
    stock: <ConfStock />,
    clients: <ConfClients />,
    financial: <ConfFinancial />,
    reports: <ConfReports />,
    settings: <ConfSettings onLogout={onLogout} />,
  };

  const pageName = nav.find(n => n.id === page)?.label || "—";

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-name">🍫 FacilGestão</div>
          <div className="sidebar-brand-sub">{conf.settings.name || "Confeitaria"}</div>
        </div>
        <nav className="sidebar-nav" role="navigation" aria-label="Navegação da confeitaria">
          {nav.map(item => (
            <div key={item.id}>
              {item.group && <div className="nav-group-label">{item.group}</div>}
              <div className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)} role="menuitem" tabIndex={0} onKeyDown={e => e.key === "Enter" && setPage(item.id)} aria-current={page === item.id ? "page" : undefined}>
                <Ic n={item.icon} />
                <span>{item.label}</span>
                {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
              </div>
            </div>
          ))}
        </nav>
        <div className="sidebar-user">
          <div className="sidebar-user-inner" onClick={() => setPage("settings")}>
            <div className="avatar avatar-lg">{user.name[0]}</div>
            <div><div className="user-name">{user.name}</div><div className="user-role">Meu Negócio</div></div>
          </div>
        </div>
      </aside>
      <main className="main" role="main">
        <div className="topbar">
          <nav className="breadcrumb" aria-label="Localização">
            <span>{conf.settings.name || "Confeitaria"}</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{pageName}</span>
          </nav>
          <div className="topbar-actions">
            {lateOrders > 0 && (
              <button className="btn btn-ghost btn-sm" style={{ color: "var(--red)", fontWeight: 600 }} onClick={() => setPage("orders")}>
                <Ic n="alert" s={14} c="var(--red)" /> {lateOrders} pedido(s) atrasado(s)
              </button>
            )}
            {lowStockCount > 0 && (
              <button className="btn btn-ghost btn-sm" style={{ color: "var(--ouro)" }} onClick={() => setPage("stock")}>
                <Ic n="stock" s={14} c="var(--ouro)" /> {lowStockCount} alerta(s) de estoque
              </button>
            )}
          </div>
        </div>
        <div className="page">{PAGES[page]}</div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [user, setUser] = useState(null);
  const [conf, setConf] = useState(INIT_CONFEITARIA);
  const [platform, setPlatform] = useState(INIT_PLATFORM);
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((msg, type = "s") => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const removeToast = useCallback(id => setToasts(t => t.filter(x => x.id !== id)), []);

  const handleLogout = () => { setUser(null); toast("Sessão encerrada.", "i"); };

  if (!user) {
    return (
      <Ctx.Provider value={{ conf, setConf, platform, setPlatform, toast }}>
        <style>{STYLES}</style>
        <LoginPage onLogin={u => { setUser(u); toast(`Bem-vindo(a)! Entrando como ${u.role === "platform_admin" ? "Administrador" : "Confeitaria"}.`, "s"); }} />
        <Toast toasts={toasts} remove={removeToast} />
      </Ctx.Provider>
    );
  }

  return (
    <Ctx.Provider value={{ conf, setConf, platform, setPlatform, toast }}>
      <style>{STYLES}</style>
      {user.role === "platform_admin"
        ? <PlatformAdmin user={user} onLogout={handleLogout} />
        : <ConfApp user={user} onLogout={handleLogout} />
      }
      <Toast toasts={toasts} remove={removeToast} />
    </Ctx.Provider>
  );
}
