export const formatDate = (date: Date) => 
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  export const formatTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hrs ago`;
    return `${minutes} mins ago`;
};