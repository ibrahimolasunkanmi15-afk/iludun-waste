import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import UserPortal from './components/UserPortal';
import AdminPanel from './components/AdminPanel';

// Safely pull the keys from the secure environment file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [view, setView] = useState('user'); 
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [pickups, setPickups] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [inputPassword, setInputPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState(() => localStorage.getItem('iludun_admin_pass') || 'Iludun2026');
  const [announceText, setAnnounceText] = useState('');
  const [liveNotification, setLiveNotification] = useState(() => localStorage.getItem('iludun_alert') || 'Welcome to Iludun Waste Connect. Keep your surroundings clean!');

  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', address: '', zone: 'Zone A', date: '', time: '' });
  const [feedbackForm, setFeedbackForm] = useState({ name: '', message: '' });

  useEffect(() => {
    fetchCloudData();
  }, []);

  const fetchCloudData = async () => {
    try {
      const { data: fetchedPickups } = await supabase.from('pickups').select('*').order('id', { ascending: false });
      const { data: fetchedFeedbacks } = await supabase.from('feedbacks').select('*').order('id', { ascending: false });
      if (fetchedPickups) setPickups(fetchedPickups);
      if (fetchedFeedbacks) setFeedbacks(fetchedFeedbacks);
    } catch (err) {
      console.error("Cloud fetch blocked. Falling back to local storage.", err);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const newBooking = { 
      id: Date.now(), 
      name: bookingForm.name, 
      phone: bookingForm.phone, 
      address: bookingForm.address, 
      zone: bookingForm.zone, 
      date: bookingForm.date, 
      time: bookingForm.time, 
      status: 'Pending' 
    };

    const { error } = await supabase.from('pickups').insert([newBooking]);
    if (error) {
      alert(`❌ Sync Error: ${error.message}. Saving locally instead.`);
    } else {
      alert(`⚡ Pickup scheduled successfully for ${bookingForm.address}!`);
      setBookingForm({ name: '', phone: '', address: '', zone: 'Zone A', date: '', time: '' });
      fetchCloudData();
    }
  };

  const handleFeedback = async (e) => {
    e.preventDefault();
    const newFb = { 
      id: Date.now(), 
      name: feedbackForm.name || 'Anonymous Resident', 
      message: feedbackForm.message, 
      date: new Date().toLocaleDateString() 
    };

    const { error } = await supabase.from('feedbacks').insert([newFb]);
    if (error) {
      alert(`❌ Sync Error: ${error.message}`);
    } else {
      alert('Thank you! Feedback posted to the global Community Board.');
      setFeedbackForm({ name: '', message: '' });
      fetchCloudData();
    }
  };

  const handleBroadcast = (e) => {
    e.preventDefault();
    localStorage.setItem('iludun_alert', `Broadcast: ${announceText}`);
    setLiveNotification(`Broadcast: ${announceText}`);
    setAnnounceText('');
    alert('Global alert notification ribbon updated successfully!');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (inputPassword === adminPassword) {
      setIsAdminLoggedIn(true);
      setInputPassword('');
      fetchCloudData();
    } else {
      alert('❌ Invalid Credentials.');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword.trim().length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    localStorage.setItem('iludun_admin_pass', newPassword);
    setAdminPassword(newPassword);
    setNewPassword('');
    alert('🔒 Admin Password successfully updated!');
  };

  const togglePickupStatus = async (id, residentName) => {
    const targetOrder = pickups.find(p => p.id === id);
    const updatedStatus = targetOrder.status === 'Pending' ? 'Completed' : 'Pending';

    const { error } = await supabase.from('pickups').update({ status: updatedStatus }).eq('id', id);
    if (error) {
      alert(`❌ Failed updating work order: ${error.message}`);
    } else {
      const statusMsg = updatedStatus === 'Completed' ? 'Finished ✅' : 'Pending ⏳';
      setLiveNotification(`Order Update: Pickup for ${residentName} is ${statusMsg}!`);
      fetchCloudData();
    }
  };

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <div style={styles.logoGroup}>
          <span style={{ fontSize: '24px' }}>🗑️</span>
          <h1 style={styles.logoText}>Iludun Waste Connect</h1>
        </div>
        <nav style={styles.navButtons}>
          <button style={{...styles.navBtn, backgroundColor: view === 'user' ? '#22c55e' : 'transparent', color: 'white'}} onClick={() => setView('user')}>👤 Resident Portal</button>
          <button style={{...styles.navBtn, backgroundColor: view === 'admin' ? '#22c55e' : 'transparent', color: 'white'}} onClick={() => setView('admin')}>🛡️ Admin Panel</button>
        </nav>
      </header>

      {view === 'user' ? (
        <UserPortal 
          bookingForm={bookingForm} setBookingForm={setBookingForm} handleBooking={handleBooking} 
          feedbackForm={feedbackForm} setFeedbackForm={setFeedbackForm} handleFeedback={handleFeedback} 
          pickups={pickups} feedbacks={feedbacks} liveNotification={liveNotification} styles={styles} 
        />
      ) : (
        <AdminPanel 
          isAdminLoggedIn={isAdminLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn} handleAdminLogin={handleAdminLogin} 
          inputPassword={inputPassword} setInputPassword={setInputPassword} adminPassword={adminPassword} 
          newPassword={newPassword} setNewPassword={setNewPassword} handleChangePassword={handleChangePassword} 
          pickups={pickups} togglePickupStatus={togglePickupStatus} feedbacks={feedbacks} 
          announceText={announceText} setAnnounceText={setAnnounceText} handleBroadcast={handleBroadcast} styles={styles} 
        />
      )}
    </div>
  );
}

const styles = {
  appContainer: { fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '40px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '15px', color: 'white' },
  logoGroup: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoText: { fontSize: '20px', margin: 0, fontWeight: 'bold' },
  navButtons: { display: 'flex', gap: '10px' },
  navBtn: { border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' },
  mainGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', padding: '25px' },
  sideColumn: { display: 'flex', flexDirection: 'column', gap: '25px' },
  card: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
  cardTitle: { fontSize: '18px', margin: '0 0 20px 0', color: '#111827' },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  input: { padding: '10px 14px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '15px' },
  row: { display: 'flex', gap: '10px' },
  submitBtn: { padding: '12px', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  reminderItem: { padding: '12px', borderLeft: '4px solid #eab308', backgroundColor: '#fef9c3', marginBottom: '10px', fontSize: '14px' },
  hintText: { fontSize: '13px', color: '#6b7280', marginTop: '10px' },
  adminHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  logoutBtn: { backgroundColor: '#4b5563', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' },
  thRow: { borderBottom: '2px solid #e5e7eb', color: '#4b5563' },
  tr: { borderBottom: '1px solid #f3f4f6' },
  badge: { fontSize: '11px', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', color: '#4b5563' },
  statusBadge: { fontSize: '12px', padding: '4px 8px', borderRadius: '12px', fontWeight: '500' },
  actionBtn: { padding: '4px 8px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', borderRadius: '4px', cursor: 'pointer' },
  feedbackList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  feedbackCard: { padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' },
  emptyState: { color: '#9ca3af', textAlign: 'center', padding: '20px 0' }
};
