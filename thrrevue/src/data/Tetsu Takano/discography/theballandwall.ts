import coverImage from "@/UI/images/tkntt/ballandwall.jpg"
export default {
    release: {
        title:"The Ball & Wall",
        info: {
            coverImage,
            rows: [
                ["Type of Release", "Mini Album"],
                ["Date of Release", "August 05, 2006"],
                ["Number of Tracks", "8 (including secret track)"],
                ["Item Number", "NLCD-19"],
                ["Retail Price", "3,300JPY"],
            ],
            columnHeader: true,
            rowHeader: false,
        notes:"This Album is tetsu takano 1st mini album."
        },
        tracklist: {
            headers: ["#", "Name", "Romaji","Video","Lyrics"],
            tracks: [[1, "BEAUTIFUL YOU", "","","y"],
            [2, "VENUS IN THE MIRROR", "","","y"],
            [3, "SAYONARA　DA VINCI", "","","y"],
            [4, "orion,can you wait?", "","","y"],
            [5, "HOTEL", "","","y"],
            [6, "summertime　cruise", "","","y"],
            [7, "garden", "","","y"],
            [8, "(secret track) placebo", "","","y"]],
           columnHeader: false,
            rowHeader: true,
        },
    },
}