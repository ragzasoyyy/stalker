// api/stalk.js
import { getUserProfileInfo } from 'tiktok-scraper';

export default async function handler(req, res) {
    const { username } = req.query;
    if (!username) return res.status(400).json({ status: false, message: 'Username kosong' });

    try {
        let cleanUsername = username.replace(/^https?:\/\/(www\.)?tiktok.com\/@/, '').split('?')[0];
        const user = await getUserProfileInfo(cleanUsername);

        res.status(200).json({
            status: true,
            profile: {
                nama: user.user.nickname,
                namaPengguna: user.user.username,
                deskripsiAkun: user.user.signature,
                followers: user.user.fans,
                following: user.user.following,
                hearts: user.user.heart,
                videoCount: user.user.videoCount,
                verified: user.user.verified ? 'Verified' : 'Not Verified',
                accountType: user.user.privateAccount ? 'Private Account' : 'Public Account',
                created: user.user.createTime,
                linkAkun: `https://www.tiktok.com/@${cleanUsername}`,
                avatar: user.user.avatarLarger
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: 'Gagal fetch data TikTok' });
    }
}
