import coverImage from "@/UI/images/disco/ufo.jpg"
export default {
    release: {
        title:"未確認飛行物体",
        info: {
            coverImage,
            rows: [
                ["Type of Release", "Full Album"],
                ["Date of Release", "April 1, 2022"],
                ["Number of Tracks", "12"],
                ["Item Number", "NLCB-1"],
                ["Retail Price", "3,500JPY"],
            ],
            columnHeader: true,
            rowHeader: false,
        },
        tracklist: {
            headers: ["#", "Name", "Romaji","Video"],
            tracks: [[1, "Wonderland Project", "",""],
            [2, "He Said, She Said", "",""],
            [3, "OLE", "",""],
            [4, "Teenage Riot", "",""],
            [5, "Boys & Girl", "",""],
            [6, "Only Lonely", "",""],
            [7, "One Way", "",""],
            [8, "Awake!", "",""],
            [9, "Hotter Than Hot", "",""],
            [10, "Sunday Driver", "",""],
            [11, "Spotlight", "",""],
            [12, "Time Goes By", "",""],],
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