import coverImage from "@/UI/images/nil/nilfromhell.jpg"
export default {
    release: {
        title:"nil from hell",
        info: {
            coverImage,
            rows: [
                ["Type of Release", "Mini Album"],
                ["Date of Release", "September 1,2002"],
                ["Number of Tracks", "06"],
                ["Item Number", "NLCD-10"],
                ["Retail Price", "1,500JPY"],
            ],
            columnHeader: true,
            rowHeader: false,
        },
        tracklist: {
            headers: ["#", "Name", "Romaji","Video"],
            tracks: [[1, "FM", "",""],
            [2, "バンビ", "Bambi",""],
            [3, "ランランラン", "Ranranran",""],
            [4, "PLACEBO", "",""],
            [5, "イエロー", "Iero",""],
            [6, "Baby Baby", "",""],],
            columnHeader: false,
            rowHeader: true,
        },
            streaming:{
            appleMusic:"https://music.apple.com/mx/album/lil-ill/1809515763",
            spotify:"https://open.spotify.com/album/0ojcGWft16NutNQYGS0fCp?si=9_KbUL19QxyVrjfqYTa2nA",
            youtubeMusic:"https://music.youtube.com/playlist?list=OLAK5uy_nfx3fi0yCOUND7-SdGXr50-OcSxFCtoYA"
    }
    },
}