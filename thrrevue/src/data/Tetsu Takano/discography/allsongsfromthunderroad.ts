import coverImage from "@/UI/images/tkntt/thunderroad.jpg"
export default {
    release: {
        title:"all songs from Thunder Road",
        info: {
            coverImage,
            rows: [
                ["Type of Release", "Full Album"],
                ["Date of Release", "October 21, 2023"],
                ["Number of Tracks", "12"],
                ["Item Number", "ASR-017"],
                ["Retail Price", "10,000JPY"],
            ],
            columnHeader: true,
            rowHeader: false,
        notes:"This is the 3rd solo album by Tetsu Takano, frontman and songwriter for ZIGZO, nil, THE JUNEJULYAUGUST, THE BLACK COMET CLUB BAND, and DISCO VOLANTE. This album was released only half a year after the release of his 2nd solo album. The rough texture of a road movie and the story that seems to follow the horizon that goes on forever are vividly unfolded with a variety of melodies"
        },
        tracklist: {
            headers: ["#", "Name", "Romaji","Video","Lyrics"],
            tracks: [[1, "Soul Fly", "","","y"],
            [2, "nothingbuteverything", "","","y"],
            [3, "I wanna swing with somebody", "","","y"],
            [4, "Desperate in Theatron", "","","y"],
            [5, "Evol Song", "","https://www.youtube.com/watch?v=N2YCgZfWicA","y"],
            [6, "Over Again", "","https://www.youtube.com/watch?v=p8k53QCYvpw","y"],
            [7, "Euphoria", "","https://www.youtube.com/watch?v=zdqDEuuEPYw","y"],
            [8, "Never let you go", "","https://www.youtube.com/watch?v=pNFr8zrJv2g","y"],
            [9, "Song of Ruins", "","","y"],
            [10, "Rest → Run", "","","y"],
            [11, "Good Sleep", "","","y"],
            [12, "On the Moon", "","https://www.youtube.com/watch?v=YDh0pLCL5ko","y"],],
            columnHeader: false,
            rowHeader: true,
        },
            streaming:{
            appleMusic:"https://www.tunecore.co.jp/to/apple_music/1086193?lang=en",
            spotify:"https://www.tunecore.co.jp/to/spotify/1086193?lang=en",
            youtubeMusic:"https://www.tunecore.co.jp/to/youtube_music_key/1086193?lang=en"
    }
    },
}