import coverImage from "@/UI/images/zigzo/mm.jpg"
export default {
    release: {
        title:"MONSTER MUSIC",
        info: {
            coverImage,
            rows: [
                ["Type of Release", "Full Album"],
                ["Date of Release", "October 1, 1999"],
                ["Number of Tracks", "11"],
                ["Item Number", "COCP-50160"],
                ["Retail Price", "3,204JPY"],
            ],
            columnHeader: true,
            rowHeader: false,
        },
        tracklist: {
            headers: ["#", "Name", "Romaji","Video"],
            tracks: [[1, "Wonderful Day", "",""],
            [2, "ひまわり", "Himawari","https://www.youtube.com/watch?v=psVZtHVooWY"],
            [3, "血と汗と涙の裏側のハッピー(album style)", "Chi to Ase to Namida no Uragawa no Happy","https://www.youtube.com/watch?v=NxnexIelgho"],
            [4, "stranger’s melancolia", "",""],
            [5, "よろこびのうた", "Yorokobi no Uta",""],
            [6, "sleep", "","https://www.youtube.com/watch?v=Qd2P01JAVoU"],
            [7, "my problems", "",""],
            [8, "ブラボ", "BRAVO",""],
            [9, "裸ピストル", "Hadaka Pistol",""],
            [10, "white,daydream", "",""],
            [11, "アジアンロック", "Asian Rock",""],],
            columnHeader: false,
            rowHeader: true,
        }        
    },
}