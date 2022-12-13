import sys


def main():
    template_file = sys.argv[1] or ".env.template"
    env_file = sys.argv[2] or ".env"

    # Read template environment file
    template = ""
    with open(template_file, "r", encoding="utf-8") as f:
        template = f.read()
        print("📖 Template file read: " + template_file)

    # Read sys.argv and replace values in template
    for i in range(1, len(sys.argv), 2):
        templateKey = sys.argv[i]
        value = sys.argv[i+1]

        template = template.replace("{{" + templateKey + "}}", value)

        print("🔧 Added " + templateKey)

    # Write new environment file
    with open(env_file, "w", encoding="utf-8") as f:
        f.write(template)
        print("📝 Environment file written: " + env_file)


if __name__ == "__main__":
    main()
