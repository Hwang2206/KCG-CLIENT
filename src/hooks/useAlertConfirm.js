import Swal from 'sweetalert2';

export const handleAlertConfirm = ({
  title,
  html,
  text,
  icon,
  confirmText,
  cancelText,
  handleConfirmed,
  showCancelButton,
  cancelButtonColor,
  confirmButtonColor
}) => {
  Swal.fire({
    title: title,
    html: html,
    text: text,
    icon: icon,
    confirmButtonText: confirmText || 'Xác nhận',
    confirmButtonColor: confirmButtonColor || undefined,
    showCancelButton: showCancelButton || false,
    cancelButtonText: cancelText || 'Huỷ',
    cancelButtonColor: cancelButtonColor || undefined
  }).then((isConfirm) => {
    if (isConfirm.isConfirmed) {
      if (handleConfirmed) {
        handleConfirmed();
      } else {
        window.location.reload();
      }
    }
  });
};
