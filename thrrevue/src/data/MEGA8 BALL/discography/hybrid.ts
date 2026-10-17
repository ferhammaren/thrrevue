import coverImage from "@/UI/images/m8b/hybrid.png"
export default {
    release: {
        title:"Hybrid",
        info: {
            coverImage,
            rows: [
                ["Type of Release", "Full Album"],
                ["Date of Release", "October 1, 1997"],
                ["Number of Tracks", "8"],
                ["Item Number", "FMH-97001"],
                ["Retail Price", "2,300JPY"],
            ],
            columnHeader: true,
            rowHeader: false,
        },
        tracklist: {
            headers: ["#", "Name", "Romaji","Video","Lyrics"],
            tracks: [[1, "Super-human-Feat", "","","y"],
            [2, "D∙O∙G", "","","y"],
            [3, "Acrobat Man", "","","y"],
            [4, "lunch", "","","y"],
            [5, "Wonder-non-fiction", "","","y"],
            [6, "Himind", "","","y"],
            [7, "Acrobat Man(De front zone mix)", "","","y"],
            [8, "Stronger than you(front zone mix)", "","","y"],],
            columnHeader: false,
            rowHeader: true,
        }        
    },
}