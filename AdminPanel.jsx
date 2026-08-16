import React from 'react';

export default function AdminPanel({ 
  isAdminLoggedIn, setIsAdminLoggedIn, handleAdminLogin, inputPassword, setInputPassword, 
  newPassword, setNewPassword, handleChangePassword, pickups, togglePickupStatus, 
  feedbacks, announceText, setAnnounceText, handleBroadcast, styles 
}) {
  if (!isAdminLoggedIn) {
    return (
      <div style={{...styles.card, maxWidth: '400px', margin: '50px auto'}}>
        <h2 style={styles.cardTitle}>🔒 Control Center Verification</h2>
        <form onSubmit={handleAdminLogin} style={styles.form}>
          <p style={{fontSize: '14px', color: '#666'}}>System Default Password is: <code>Iludun2026</code></p>
          <input type="password" placeholder="Enter Control Password" required value={inputPassword} onChange={e => setInputPassword(e.target.value)} style={styles.input} />
          <button type="submit" style={{...styles.submitBtn, backgroundColor: '#ef4444'}}>Verify Authentication</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{padding: '20px max(5%, 20px)'}}>
      <div style={styles.adminHeaderRow}>
        <h2>⚙️ Operational Dashboard</h2>
        <button style={styles.logoutBtn} onClick={() => setIsAdminLoggedIn(false)}>🚪 Terminate Session</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <section style={styles.card}>
          <h3 style={styles.cardTitle}>🔐 Change Password</h3>
          <form onSubmit={handleChangePassword} style={{display: 'flex', gap: '10px'}}>
            <input type="password" placeholder="New Password" required value={newPassword} onChange={e => setNewPassword(e.target.value)} style={{...styles.input, marginBottom: 0, flex: 1}} />
            <button type="submit" style={{...styles.submitBtn, width: 'auto', backgroundColor: '#4b5563'}}>Update</button>
          </form>
        </section>

        <section style={styles.card}>
          <h3 style={styles.cardTitle}>📢 Push Community Alert</h3>
          <form onSubmit={handleBroadcast} style={{display: 'flex', gap: '10px'}}>
            <input type="text" placeholder="e.g., Rain delay in Zone A..." required value={announceText} onChange={e => setAnnounceText(e.target.value)} style={{...styles.input, marginBottom: 0, flex: 1}} />
            <button type="submit" style={{...styles.submitBtn, width: 'auto', backgroundColor: '#eab308'}}>Broadcast</button>
          </form>
        </section>
      </div>

      <div style={styles.mainGrid}>
        <section style={styles.card}>
          <h3 style={styles.cardTitle}>Incoming Pickup Dispatches ({pickups.length})</h3>
          {pickups.length === 0 ? <p style={styles.emptyState}>No service dispatches requested yet.</p> : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.thRow}>
                    <th>Resident</th>
                    <th>Address</th>
                    <th>Target Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pickups.map(p => (
                    <tr key={p.id} style={styles.tr}>
                      <td><strong>{p.name}</strong><br/><small>{p.phone}</small></td>
                      <td>{p.address}<br/><span style={styles.badge}>{p.zone}</span></td>
                      <td>{p.date} | {p.time}</td>
                      <td>
                        <span style={{
                          ...styles.statusBadge, 
                          backgroundColor: p.status === 'Completed' ? '#dcfce7' : '#fef9c3',
                          color: p.status === 'Completed' ? '#15803d' : '#a16207'
                        }}>
                          {p.status === 'Completed' ? '✅ ' : '⏳ '}{p.status}
                        </span>
                      </td>
                      <td>
                        <button style={styles.actionBtn} onClick={() => togglePickupStatus(p.id, p.name)}>
                          Mark {p.status === 'Pending' ? 'Done' : 'Pending'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section style={styles.card}>
          <h3 style={styles.cardTitle}>📥 Resident Feedbacks ({feedbacks.length})</h3>
          {feedbacks.length === 0 ? <p style={styles.emptyState}>No user messages on file.</p> : (
            <div style={styles.feedbackList}>
              {feedbacks.map(f => (
                <div key={f.id} style={styles.feedbackCard}>
                  <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                    <strong>{f.name || 'Anonymous Resident'}</strong>
                    <span style={{fontSize:'12px', color:'#999'}}>{f.date}</span>
                  </div>
                  <p style={{margin: '8px 0 0', color: '#444'}}>{f.message}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
