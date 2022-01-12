import utf8 from "utf8";

export const getPostsStatistics = ({ posts = [] }) => {
  decodeUtf8InStrings(posts);

  const places = posts.map((p) => getPlaces(p)).flatMap((x) => (!!x ? x : []));
  const media = posts.map((p) => getMedia(p)).flatMap((x) => (!!x ? x : []));
  const external = posts
    .map((p) => getExternal(p))
    .flatMap((x) => (!!x ? x : []));
  const gifs = external.filter((x) => isGif(x.url)).map((x) => x.url);
  const texts = posts.map((p) => getPostText(p)).flatMap((x) => (!!x ? x : []));
  const emojies = texts.map((t) => getEmojies(t)).flatMap((x) => x);
  const titles = posts.map((p) => getTitle(p)).filter((x) => (!!x ? x : []));
  const tags = posts
    .map((p) => getTags(p))
    .flatMap((x) => (!!x ? x : []))
    .filter((x) => !!x);

  return {
    topUsedEmojies: topMost(emojies, (x) => x).map((x) => ({
      value: x.key,
      count: x.count,
    })),
    topTaggedPersons: topMost(tags, (x) => x.name).map((x) => ({
      value: x.key,
      count: x.count,
    })),
    topUsedPlaces: topMost(places, (x) => x.name).map((x) => ({
      value: x.key,
      count: x.count,
    })),
    postsWithPlacesCount: places.length,
    postsWithGifsCount: gifs.length,
    postsWithImagesCount: media.filter((x) => isImg(x.uri)).length,
    postsWithVideoCount: media.filter((x) => isVideo(x.uri)).length,
    avgTextLength: Math.round(avg(texts.map((x) => x.length))),
    postsCount: posts.length
  };
  function isVideo(uri) {
    const extension = get_url_extension(uri);
    return ["mp4", "mov"].includes(extension);
  }

  function isImg(uri) {
    const extension = get_url_extension(uri);
    return ["jpg", "png", "jpe", "bmp"].includes(extension);
  }

  function isGif(uri) {
    const extension = get_url_extension(uri);
    return extension == "gif";
  }

  function getTags(post) {
    return post?.tags;
  }

  function getTitle(post) {
    return post?.title;
  }

  function getPostText(post) {
    return post?.data?.map((d) => d.post).filter((x) => !!x);
  }

  function getMedia(post) {
    return post?.attachments
      ?.map((a) => a.data?.map((d) => d.media)?.filter((x) => !!x))
      ?.flatMap((x) => (!!x ? x : []));
  }

  function getExternal(post) {
    return post?.attachments
      ?.map((a) => a.data?.map((d) => d.external_context)?.filter((x) => !!x))
      ?.flatMap((x) => (!!x ? x : []));
  }

  function getPlaces(post) {
    return post?.attachments
      ?.map((a) => a.data?.map((d) => d.place)?.filter((x) => !!x))
      ?.flatMap((x) => (!!x ? x : []));
  }

  function getEmojies(text) {
    const regexExp =
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
    return text.match(regexExp) ?? [];
  }

  function topMost(objects, idSelector) {
    const withIds = objects.map((obj) => ({ key: idSelector(obj), obj: obj }));
    const asObj = groupByInner(withIds, "key");
    const result = Object.keys(asObj).map((key) => ({
      key,
      count: asObj[key].length,
      obj: asObj[key][0].obj,
    }));
    return result.sort((a, b) => a.count > b.count);

    function groupByInner(xs, key) {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    }
  }
};

function decodeUtf8InStrings(obj) {
  for (var k in obj) {
    if (!obj.hasOwnProperty(k)) {
      continue;
    }

    if (typeof obj[k] === "object" && obj[k] !== null) {
      decodeUtf8InStrings(obj[k]);
      continue;
    }

    if (typeof obj[k] === "string" && obj[k] !== null) {
      obj[k] = utf8.decode(obj[k]);
    }
  }
}

function get_url_extension(url) {
  return url.split(/[#?]/)[0].split(".").pop().trim();
}

function avg(array) {
  return array.reduce((a, b) => a + b) / array.length;
}
