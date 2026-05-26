import { Post } from "../../../models/post";
import { useGetFeaturedListsQuery } from "../../../redux/apis/post.api";
import { formatDateShort } from "../../../utils/time-formate";
import LoadingAnimation from "../../loading/loading.component";
import SSProfile from "../../ui-component/ss-profile/ss-profile";
import { useNavigate } from "react-router-dom";
import BookmarkButton from "../../BookmarkButton";

import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const FeatureComponent = () => {
  const { data, isLoading } = useGetFeaturedListsQuery(undefined);
  const navigate = useNavigate();

  const calculateReadingTime = (content: string): number => {
    if (!content) return 1;

    const words = content.trim().split(/\s+/).length;

    return Math.max(1, Math.ceil(words / 200));
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <section className="mb-12 text-slate-100">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
    <div className="mb-12 text-slate-900 dark:text-slate-100">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
        Featured Posts
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
        {(data?.posts?.length ?? 0) > 0 ? (
          data?.posts?.map((post: Post) => {
            const postUrl = `${window.location.origin}/post/${post._id}`;

            return (
              <div
                key={post._id}
                onClick={() => navigate(`/post/${post._id}`)}
                className="motion-card story-panel group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg hover:border-blue-400/35"
              >
                <div className="relative h-48 overflow-hidden sm:h-52">
                  <img
                    className="motion-image h-full w-full object-cover"
                    src={post.imageURL}
                    alt={post.title || "Featured Post"}
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center">
                        <SSProfile
                          name={post.author?.name || "Unknown User"}
                          size="h-8 w-8"
                        />
                        <div className="ml-3 min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-300">
                            {post.author?.name || "Unknown User"}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                            <p className="text-xs text-slate-500">
                              {formatDateShort(post.createdAt)}
                            </p>
                            <span className="text-xs text-slate-600">•</span>
                            <p className="text-xs font-medium text-indigo-300">
                              {calculateReadingTime(post.content)} min read

                        <div className="ml-4">
                          <p className="text-sm font-medium text-slate-600 dark:text-gray-400">
                            {post.author?.name || "Unknown User"}
                          </p>

                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-xs text-slate-500 dark:text-gray-500">
                              {formatDateShort(post.createdAt)}
                            </p>

                            <span className="text-slate-400 dark:text-gray-600 text-xs">
                              •
                            </span>

                            <p className="text-xs text-purple-400 font-medium">
                              ⏱️ {calculateReadingTime(post.content)} min read
                            </p>
                          </div>
                        </div>
                      </div>

                      <div onClick={(e) => e.stopPropagation()} className="relative z-10">
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative z-10"
                      >
                        <BookmarkButton
                          storyId={post._id}
                          bookmarks={post.bookmarks}
                          className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-700/40 hover:text-purple-300"
                        />
                      </div>
                    </div>

                    <h3 className="mb-2 text-xl font-bold leading-snug text-slate-100 transition-colors group-hover:text-blue-300">
                      {post.title}
                    </h3>

                    <p className="mb-5 line-clamp-2 leading-relaxed text-slate-400">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-gray-300 mb-2 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.content || ""}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-col gap-4 border-t border-slate-700/70 pt-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <i className="far fa-heart"></i>
                  <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-4 text-sm text-slate-500 dark:text-gray-500 mt-auto">
                    <div className="flex items-center">
                      <span className="flex items-center mr-4">
                        <i className="far fa-heart mr-1"></i>
                        {post.likesCount ?? 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="far fa-comment"></i>

                      <span className="flex items-center">
                        <i className="far fa-comment mr-1"></i>
                        {post.commentsCount ?? 0}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex items-center gap-4 text-slate-500 dark:text-gray-400">
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          postUrl
                        )}&text=${encodeURIComponent(post.title || "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Share on Twitter"
                        className="motion-icon hover:-translate-y-0.5 hover:text-sky-400"
                        title="Share on X"
                        className="motion-icon hover:text-sky-400 hover:-translate-y-0.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaXTwitter size={16} />
                      </a>

                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                          postUrl
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Share on LinkedIn"
                        className="motion-icon hover:-translate-y-0.5 hover:text-blue-500"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaLinkedin size={16} />
                      </a>

                      <a
                        href={`mailto:?subject=${encodeURIComponent(
                          post.title || ""
                        )}&body=${encodeURIComponent(
                          `${(post.content || "").slice(
                            0,
                            120
                          )}...\n\nRead more: ${postUrl}`
                        )}`}
                        title="Share via Email"
                        className="motion-icon hover:-translate-y-0.5 hover:text-red-400"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaEnvelope size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="story-panel rounded-lg px-4 py-5 text-slate-300">
            Featured posts are not available.
          <div className="rounded-lg border border-slate-200 dark:border-slate-700/70 bg-slate-100 dark:bg-slate-900/40 px-4 py-5 text-slate-700 dark:text-slate-300">
            Feature Post is not available!
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureComponent;