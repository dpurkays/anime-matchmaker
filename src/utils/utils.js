const formatRating = (rating) => {
    if(!rating) return "N/A";
    if (rating.startsWith("R - 17")) return "R-17+";
    return rating.split(" ")[0];
} 


export { formatRating };
