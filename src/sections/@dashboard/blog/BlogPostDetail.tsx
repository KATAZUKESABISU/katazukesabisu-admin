import React from 'react';

// @mui
import { styled, alpha } from '@mui/material/styles';
import { Link, Card, Avatar, Typography, CardContent } from '@mui/material';

// utils
import { fDate } from 'src/utils/formatTime';
import SvgColor from 'src/components/utils/svg-icon/SvgColor';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
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
});

// ----------------------------------------------------------------------

interface BlogItem {
  id: string;
  cover: string;
  title: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  createdAt: Date;
}

interface BlogPostCardProps {
  post: BlogItem;
  index: number;
}

export default function BlogPostDetail({ post, index }: BlogPostCardProps) {
  const { cover, title, author, createdAt } = post;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  return (
    <Card sx={{ position: 'relative' }}>
      <StyledCardMedia
        sx={{
          ...((latestPostLarge || latestPost) && {
            pt: 'calc(100% * 4 / 3)',
          }),
          ...(latestPostLarge && {
            pt: {
              xs: 'calc(100% * 4 / 3)',
              sm: 'calc(100% * 3 / 4.66)',
            },
          }),
          '&:after': {
            top: 0,
            content: "''",
            width: '100%',
            height: '100%',
            position: 'absolute',
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.12),
          },
        }}
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
        <StyledAvatar alt={author.name} src={author.avatarUrl} />

        <StyledCover alt={title} src={cover} />
      </StyledCardMedia>

      <CardContent sx={{ pt: 4 }}>
        <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
          {fDate(createdAt)}
        </Typography>

        <StyledTitle
          color="inherit"
          variant="subtitle2"
          underline="hover"
          sx={{
            ...(latestPostLarge && { typography: 'typography.h5', height: 60 }),
          }}
        >
          {title}
        </StyledTitle>
      </CardContent>
    </Card>
  );
}
