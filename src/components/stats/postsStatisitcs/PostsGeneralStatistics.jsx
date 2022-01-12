import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import {useCommonStyles} from "../../../theme/commonStyles";
import {CustomCountUp} from "../../generic/DataDisplay";
import DoneIcon from "@material-ui/icons/Done";
import StarIcon from '@material-ui/icons/Star';
import CloseIcon from '@material-ui/icons/Close';
import {useTranslation} from "react-i18next";
import {DataLabeled} from "../../generic/DataDisplay";

const PostsGeneralStatistics = (props) => {
    const {t} = useTranslation();

    const {
        postsCount = 0,
        postsWithPlacesCount = 0,
        postsWithGifsCount = 0,
        postsWithImagesCount = 0,
        postsWithVideoCount = 0,
        avgTextLength = 0,        
        topUsedEmojies = [],
        topTaggedPersons = [],
        topUsedPlaces = []
    } = props;

    const styles = useCommonStyles();

    return (
        <Grid container spacing={5} className={styles.containerPadding}>
            <Grid item xs={12}>
                <Typography variant={'h6'}>
                    {t('general:your_posts')}
                </Typography>
            </Grid>
            
            <CustomCountUp label={t('general:posts_count')}
                           value={postsCount}                        
                           xs={6}
                           big/>
            
            <CustomCountUp label={t('general:posts_avg_length')}
                           value={avgTextLength}                        
                           xs={6}
                           big/>

            <CustomCountUp label={t('general:posts_with_gifs_count')}
                           value={postsWithGifsCount}                           
                           xs={3}
                           big/>

            <CustomCountUp label={t('general:posts_with_images_count')}
                           value={postsWithImagesCount}
                           xs={3}
                           big/>

            <CustomCountUp label={t('general:posts_with_video_count')}
                           value={postsWithVideoCount}
                           xs={3}
                           big/>

            <CustomCountUp label={t('general:posts_with_places_count')}
                           value={postsWithPlacesCount}                           
                           xs={3}
                           big/>

            <Grid item xs={4}>
                <DataLabeled label={t('general:posts_top_used_emoji')} value={topUsedEmojies[0]?.value ?? ""}/>  
            </Grid>
            
            <Grid  item xs={4}>
                <DataLabeled label={t('general:posts_top_tagged_place')} value={topUsedPlaces[0]?.value ?? ""}/>
            </Grid>
            <Grid  item xs={4}>
                <DataLabeled label={t('general:posts_top_tagged_person')} value={topTaggedPersons[0]?.value ?? ""}/>
            </Grid>

        </Grid>
    );
};


export default PostsGeneralStatistics;
