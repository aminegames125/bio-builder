import { useState, useEffect } from 'react';
import AnimatedIcon from '../icons/AnimatedIcon';

const GithubRepoBlock = ({ repo, username }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data for demo purposes to avoid rate limits
        // In production, fetch from https://api.github.com/repos/${username}/${repo}
        setTimeout(() => {
            setData({
                name: repo,
                description: "A powerful bio page builder with JSON configuration.",
                stars: 1240,
                forks: 350,
                language: "TypeScript",
                url: `https://github.com/${username}/${repo}`
            });
            setLoading(false);
        }, 1000);
    }, [repo, username]);

    if (loading) {
        return <div className="w-full h-32 bg-gray-100 rounded-xl animate-pulse"></div>;
    }

    return (
        <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gray-900 text-white p-5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-700"
        >
            <div className="flex items-center gap-3 mb-3">
                <AnimatedIcon name="Github" size={24} />
                <span className="font-bold text-lg text-blue-400">{username}/{data.name}</span>
            </div>

            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{data.description}</p>

            <div className="flex gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                    <div className="size-3 rounded-full bg-yellow-400"></div>
                    <span>{data.language}</span>
                </div>
                <div className="flex items-center gap-1">
                    <AnimatedIcon name="Star" size={14} />
                    <span>{data.stars}</span>
                </div>
                <div className="flex items-center gap-1">
                    <AnimatedIcon name="GitFork" size={14} />
                    <span>{data.forks}</span>
                </div>
            </div>
        </a>
    );
};

export default GithubRepoBlock;
