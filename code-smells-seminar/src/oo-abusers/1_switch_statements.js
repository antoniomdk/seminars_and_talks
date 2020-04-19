// If-else version
const getBackgroundArt = (track) => {
  let backgroundImage;

  if(!track.getGenre()) {
    backgroundImage = {dimension: BackgroundImageDimensions.small, url : DEFAULT_BACKGROUND_IMAGE_URL};
  } else if (track.getGenre() == "hiphop") {
    backgroundImage = {dimension: BackgroundImageDimensions.small, url: HIPHOP_BACKGROUND_IMAGE_URL};
  } else if(track.getGenre() == "jazz") {
    backgroundImage = {dimension: BackgroundImageDimensions.small, url: JAZZ_BACKGROUND_IMAGE_URL};
  } else if(track.getGenre() == "rap") {
    backgroundImage = {dimension: BackgroundImageDimensions.small, url: RAP_BACKGROUND_IMAGE_URL};
  } else if(track.getGenre() == "country") {
    backgroundImage = {dimension: BackgroundImageDimensions.small, url: COUNTRY_BACKGROUND_IMAGE_URL};
  }

  return backgroundImage;
}

// Switch version
const getBackgroundArt = (track) => {
  let backgroundImage;

  switch (track.getGenre()) {
    case 'hiphop':
      backgroundImage = {dimension: BackgroundImageDimensions.small, url: HIPHOP_BACKGROUND_IMAGE_URL};
      break;
    case 'jazz':
      backgroundImage = {dimension: BackgroundImageDimensions.small, url: JAZZ_BACKGROUND_IMAGE_URL};
      break;
    case 'rap':
      backgroundImage = {dimension: BackgroundImageDimensions.small, url: RAP_BACKGROUND_IMAGE_URL};
      break;
    case 'country':
      backgroundImage = {dimension: BackgroundImageDimensions.small, url: COUNTRY_BACKGROUND_IMAGE_URL};
      break;
    default:
      backgroundImage = {dimension: BackgroundImageDimensions.small, url : DEFAULT_BACKGROUND_IMAGE_URL};
    return backgroundImage;
  }

  return backgroundImage;
}

// Enum-switch version


// Inmutable version


// Function selector
const makeUser = (role) => {
  switch (role) {
    case MODERATOR:
      return makeTesla()
    case ADMIN:
      return makeTesla()
    default:
      return makeRegularUser()
  }
}
