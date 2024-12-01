

const getRelativePath = (data: any, slug: string) => {
    if(data.contentType == 'projects'){
        return data.url
    }
    if(!data.contentType) {
        return `/quick-tips/${slug}`
    }
    return `/${data.contentType}/${slug}`
};

export default getRelativePath