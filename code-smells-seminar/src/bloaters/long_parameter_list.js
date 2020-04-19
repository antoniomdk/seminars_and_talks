const updateSubscription = async (
  memberInfoId,
  emailDelivery,
  notifications,
  signature,
  ownerEmail,
  messageSelection,
  autoFollowReplies,
  maxAttachmentSize
) => {
  const token = await getToken();
  const body = {
    member_info_id: memberInfoId,
    csrf: token,
    email_delivery: emailDelivery,
    auto_follow_replies: autoFollowReplies,
    owner_msg_notify: ownerEmail,
    signature: signature.content,
    sig_format: "sig_format_html",
    use_signature: signature.webPosting,
    use_signature_email: signature.emailPosting,
    message_selection: messageSelection,
    max_attachment_size: maxAttachmentSize,
    ...notifications
  };
  const response = await AxiosInstance.post(UPDATE_SUBSCRIPTION, body);
  return response.data;
};

// Bad use
const uploadPhoto = apiAction(async (image, { memberId = 0 }) => {
  const endpoint = `${URL}${UPDATE_PROFILE_PHOTO}`;
  const config = await getConfigToUploadFile(image, "imageupload", memberId);
  const response = await fetch(endpoint, config);

  if (response.status === 200) {
    const responseJson = await response.json();
    return responseJson;
  }

  return -1;
});
