const getEmoji = (value: string) :string => {
    switch (value) {
        case "ACUTE_CRISIS":
          return "🆘";
        case "OVERLOAD":
          return "🤯";
        case "DEPRESSION":
          return "😔";
        case "ADDICTION":
          return "🍷";
        case "BURNOUT":
          return "💥";
        case "FEAR":
          return "⚡️";
        default:
          return "🤷‍♀️";
      }
}

export default getEmoji;