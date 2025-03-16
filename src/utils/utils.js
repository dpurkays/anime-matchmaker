const formatRating = (rating) => {
    if(!rating) return "N/A";
    if (rating.startsWith("R - 17")) return "17+";
    if(rating.startsWith("R+") || rating.startsWith("Rx")) return "18+";
    return rating.split(" ")[0];
} 


export { formatRating };
