export function validateName(name: string): boolean {
  const regex =
    /^(?=.{3,15}$)[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'\- ]{1,}(?: [A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'\- ]{1,})*$/;
  return regex.test(name);
}

export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validateLinkedIn(linkedIn: string): boolean {
  const regex =
    /^https:\/\/(www\.)?linkedin\.com\/(in|profile)\/([a-zA-Z0-9_-]{5,30})/;
  return regex.test(linkedIn);
}

export function validateAddressLine(address: string): boolean {
  const regex = /^[a-zA-Z0-9\s,.-]{3,30}$/;
  return regex.test(address);
}
