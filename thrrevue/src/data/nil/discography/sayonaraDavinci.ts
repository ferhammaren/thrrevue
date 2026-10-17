import coverImage from "@/UI/images/nil/nilfromhell.jpg"
export default {
    release: {
        title:"さよならダヴィンチ",
        info: {
            coverImage,
            rows: [
                ["Type of Release", "Mini Album"],
                ["Date of Release", "December 1, 2002"],
                ["Number of Tracks", "06"],
                ["Item Number", "NLCD-10"],
                ["Retail Price", "1,500JPY"],
            ],
            columnHeader: true,
            rowHeader: false,
        },
        tracklist: {
            headers: ["#", "Name", "Romaji","Video","Lyrics"],
            tracks: [[1, "さよならダヴィンチ", "Sayonara DaVinci","","y"],
            [2, "サマタイムクルーズ", "","","y"],
            [3, "ロマン・スカ－", "Roman Ska","","y"],
            [4, "The end is near !", "","","y"],
            [5, "モナリザ", "Mona Lisa","","y"],
            [6, ".n.i.l.", "","","y"],],
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