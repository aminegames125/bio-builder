import { useState, useEffect, useMemo } from 'react';
import AnimatedIcon from '../icons/AnimatedIcon';

const GithubRepoBlock = ({ repo = '', username = '', show_stats = true }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { owner, name } = useMemo(() => {
        if (repo?.includes('/')) {
            const [ownerPart, namePart] = repo.split('/');
            return { owner: ownerPart, name: namePart };
        }
        return { owner: username, name: repo };
    }, [repo, username]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchRepo = async () => {
            if (!owner || !name) {
                setError('Repository not configured');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const res = await fetch(`https://api.github.com/repos/${owner}/${name}`, { signal: controller.signal });

                if (!res.ok) {
                    throw new Error(`GitHub API responded with ${res.status}`);
                }

                const json = await res.json();
                setData({
                    name: json.name,
                    description: json.description,
                    stars: json.stargazers_count,
                    forks: json.forks_count,
                    language: json.language,
                    url: json.html_url,
                    open_issues: json.open_issues_count
                });
                setError(null);
            } catch (err) {
                if (controller.signal.aborted) return;
                console.error('Failed to fetch GitHub repo', err);
                setError('Unable to load repository data right now.');
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchRepo();

        return () => controller.abort();
    }, [owner, name]);

    if (loading) {
        return <div className="w-full h-32 bg-gray-100 rounded-xl animate-pulse"></div>;
    }

    if (error || !data) {
        return (
            <div className="w-full p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-700 text-sm">
                {error || 'Repository data unavailable.'}
            </div>
        );
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
                <span className="font-bold text-lg text-blue-400">{owner}/{data.name}</span>
            </div>

            {data.description && <p className="text-gray-300 text-sm mb-4 line-clamp-2">{data.description}</p>}

            <div className="flex gap-4 text-xs text-gray-400">
                {data.language && (
                    <div className="flex items-center gap-1">
                        <div className="size-3 rounded-full bg-yellow-400"></div>
                        <span>{data.language}</span>
                    </div>
                )}
                {show_stats && (
                    <>
                        <div className="flex items-center gap-1">
                            <AnimatedIcon name="Star" size={14} />
                            <span>{data.stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <AnimatedIcon name="GitFork" size={14} />
                            <span>{data.forks}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <AnimatedIcon name="AlertCircle" size={14} />
                            <span>{data.open_issues} issues</span>
                        </div>
                    </>
                )}
            </div>
        </a>
    );
};

export default GithubRepoBlock;
