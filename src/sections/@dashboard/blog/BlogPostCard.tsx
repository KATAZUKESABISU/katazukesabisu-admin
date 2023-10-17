import React from 'react';

// @mui
import { styled, alpha } from '@mui/material/styles';
import { Link, Card, Grid, Avatar, Typography, CardContent, Chip } from '@mui/material';

// utils
import { fDate } from 'src/utils/formatTime';
import SvgColor from 'src/components/utils/svg-icon/SvgColor';
import { useNavigate } from 'react-router-dom';
import { URL_MAPPING } from 'src/routes/urlMapping';
import { BlogItemProps } from 'src/types/Blog';
import { useAppSelector } from 'src/store/hook';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: '200px',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  cursor: 'pointer',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  cursor: 'pointer',
});

const StyledPublish = styled('div')({
  top: '8px',
  right: '8px',
  position: 'absolute',
  '& .MuiChip-label': {
    padding: '0 4px',
  },
  '& .MuiChip-root.MuiChip-filled.default': {
    backgroundColor: '#DFE3E8',
    color: '#000',
  },
});

// ----------------------------------------------------------------------

interface BlogItem extends BlogItemProps {
  id: string;
  // view: number;
  // comment: number;
  // share: number;
}

interface BlogPostCardProps {
  post: BlogItem;
  index: number;
}

export default function BlogPostCard({ post, index }: BlogPostCardProps) {
  const { title, id, createDate, image, published } = post;
  const latestPostLarge = index === 0;
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const handlePostClick = () => {
    navigate(`${URL_MAPPING.BLOG_DETAIL}/${id}`);
  };

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3} flexGrow={1}>
      <Card sx={{ position: 'relative', height: '100%' }}>
        <StyledCardMedia
          sx={(theme) => ({
            '&:after': {
              top: 0,
              content: "''",
              width: '100%',
              height: '100%',
              position: 'absolute',
              bgcolor: theme.palette.mode === 'dark' ? alpha('#fff', 0.12) : alpha(theme.palette.grey[900], 0.12),
            },
          })}
        >
          <SvgColor
            color="paper"
            src="/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
            }}
          />
          <StyledAvatar alt={user.displayName} src={user.photoUrl} />

          <StyledCover alt={title} src={image || '/assets/illustrations/fallback_img.svg'} onClick={handlePostClick} />
        </StyledCardMedia>

        <CardContent sx={{ paddingBottom: '16px !important' }}>
          <Typography
            gutterBottom
            variant="caption"
            title={fDate(createDate, 'dd MMM yyyy, HH:mm')}
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            {fDate(createDate)}
          </Typography>

          <StyledTitle color="inherit" variant="subtitle2" underline="hover" onClick={handlePostClick}>
            {title}
          </StyledTitle>

          <StyledPublish>
            {published ? (
              <Chip
                size="small"
                sx={{ p: '4px' }}
                color="primary"
                icon={<Iconify icon="material-symbols:check-circle" />}
                label="Published"
              />
            ) : (
              <Chip
                size="small"
                sx={{ p: '4px', border: '1px solid #999' }}
                className="default"
                icon={<Iconify icon="material-symbols:unpublished" />}
                label="Unpublished"
              />
            )}
          </StyledPublish>

          {/* <StyledInfo>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500',
                  }),
                }}
              >
                <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </StyledInfo> */}
        </CardContent>
      </Card>
    </Grid>
  );
}
