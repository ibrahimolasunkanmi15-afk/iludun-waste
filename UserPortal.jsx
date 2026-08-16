import React from 'react';

export default function UserPortal({ 
  bookingForm, setBookingForm, handleBooking, 
  feedbackForm, setFeedbackForm, handleFeedback, 
  pickups, feedbacks, liveNotification, styles 
}) {

  const defaultAnnouncements = [
    { id: 'def1', date: 'Info', text: '🚛 Main truck is on schedule. Please ensure bins are accessible.' },
    { id: 'def2', date: 'Notice', text: '♻️ Separating recyclable plastics helps the Iludun green project!' }
  ];

  return (
    <main style={styles.mainGrid}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>📅 Schedule a Waste Pickup</h2>
          <form onSubmit={handleBooking} style={styles.form}>
            <input type="text" placeholder="Your Full Name" required value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} style={styles.input} />
            <input type="tel" placeholder="Phone Number" required value={bookingForm.phone} onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} style={styles.input} />
            <input type="text" placeholder="Street Address (e.g., Block 4, Iludun Estate)" required value={bookingForm.address} onChange={e => setBookingForm({...bookingForm, address: e.target.value})} style={styles.input} />
            
            <select value={bookingForm.zone} onChange={e => setBookingForm({...bookingForm, zone: e.target.value})} style={styles.input}>
              <option value="Zone A">Iludun Zone A (Main Road Area)</option>
              <option value="Zone B">Iludun Zone B (Inside Estate)</option>
              <option value="Zone C">Iludun Zone C (Extension)</option>
            </select>

            <div style={styles.row}>
              <input type="date" required value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})} style={{...styles.input, flex: 1}} />
              <input type="time" required value={bookingForm.time} onChange={e => setBookingForm({...bookingForm, time: e.target.value})} style={{...styles.input, flex: 1}} />
            </div>
            <button type="submit" style={styles.submitBtn}>Book Collection</button>
          </form>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>🗂️ Live Operational Broadcast Logs</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
            <div style={{ padding: '12px', backgroundColor: '#eff6ff', borderLeft: '4px solid #1d4ed8', borderRadius: '4px', fontSize: '13px', fontWeight: '500', color: '#1e40af' }}>
              🎯 Current Status: {liveNotification}
            </div>
            
            {pickups.slice(0, 3).map(p => (
              <div key={p.id} style={{ padding: '10px', backgroundColor: '#f8fafc', borderLeft: '4px solid #64748b', borderRadius: '4px', fontSize: '12px' }}>
                <span style={{ color: '#64748b', fontWeight: 'bold' }}>UPDATE</span>
                <p style={{ margin: '2px 0 0', color: '#334155' }}>Pickup ordered for <strong>{p.address} ({p.zone})</strong> is currently listed as: <strong>{p.status}</strong></p>
              </div>
            ))}

            {defaultAnnouncements.map(d => (
              <div key={d.id} style={{ padding: '10px', backgroundColor: '#f8fafc', borderLeft: '4px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', color: '#475569' }}>
                <strong>{d.date}:</strong> {d.text}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div style={styles.sideColumn}>
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>🔔 Official Zone Schedule</h2>
          <div style={styles.reminderItem}><strong>Zone A:</strong> Mondays & Thursdays (7:00 AM)</div>
          <div style={styles.reminderItem}><strong>Zone B:</strong> Tuesdays & Fridays (8:30 AM)</div>
          <div style={styles.reminderItem}><strong>Zone C:</strong> Wednesdays & Saturdays (7:30 AM)</div>
          <p style={styles.hintText}>💡 Notice: Place bins outside 30 minutes before your zone's collection window.</p>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>💬 Complaints & Feedback Form</h2>
          <form onSubmit={handleFeedback} style={styles.form}>
            <input type="text" placeholder="Name (Optional)" value={feedbackForm.name} onChange={e => setFeedbackForm({...feedbackForm, name: e.target.value})} style={styles.input} />
            <textarea placeholder="Report missed collections, broken public bins..." required value={feedbackForm.message} onChange={e => setFeedbackForm({...feedbackForm, message: e.target.value})} style={{...styles.input, minHeight: '80px', resize: 'none'}} />
            <button type="submit" style={{...styles.submitBtn, backgroundColor: '#3b82f6'}}>Submit Review</button>
          </form>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}><span style={{ marginRight: '5px' }}>👥</span> Community Feedback Feed Board</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto' }}>
            {feedbacks.length === 0 ? (
              <p style={{ ...styles.emptyState, padding: '10px' }}>No community messages filed yet. Be the first!</p>
            ) : (
              feedbacks.map(fb => (
                <div key={fb.id} style={{ padding: '12px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#166534', fontWeight: 'bold', marginBottom: '4px' }}>
                    <span>👤 {fb.name || 'Anonymous Resident'}</span>
                    <span style={{ fontSize: '11px', color: '#166534', opacity: 0.7 }}>{fb.date}</span>
                  </div>
                  <p style={{ margin: 0, color: '#14532d', fontStyle: 'italic' }}>"{fb.message}"</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
