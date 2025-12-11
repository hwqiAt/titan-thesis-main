export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const result = reader.result

      if (typeof result === "string") {
        resolve(result)
      } else {
        reject(
          new Error(
            "Failed to convert file to Base64: unexpected result type.",
          ),
        )
      }
    }

    reader.readAsDataURL(file)
  })
}
