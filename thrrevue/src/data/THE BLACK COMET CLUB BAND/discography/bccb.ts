import coverImage from "@/UI/images/bccb/bccb.jpg"
export default {
    release: {
        title:"THE BLACK COMET CLUB BAND",
        info: {
            coverImage,
            rows: [
                ["Type of Release", "Full Album"],
                ["Date of Release", "October 7, 2015"],
                ["Number of Tracks", "12"],
                ["Item Number", "NLCB-1"],
                ["Retail Price", "3,500JPY"],
            ],
            columnHeader: true,
            rowHeader: false,
        },
        tracklist: {
            headers: ["#", "Name", "Romaji","Video"],
            tracks: [[1, "The Party Song", "",""],
            [2, "Hide&Seek", "",""],
            [3, "No.9", "",""],
            [4, "Jolly Roger", "",""],
            [5, "Soma", "",""],
            [6, "Odyssey", "",""],
            [7, "VAGABOND", "",""],
            [8, "Running Bird", "",""],
            [9, "BANDEIRA", "",""],
            [10, "ALL ILL", "",""],
            [11, "BWY", "",""],
            [12, "Little Light, Big Shadow", "",""],],
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