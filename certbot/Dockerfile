FROM certbot/certbot

# The script for certificate issuance and renewal
COPY certbot-script.sh /usr/src

# Set permissions for the script
RUN chmod +x /usr/src/certbot-script.sh

# Define entrypoint
ENTRYPOINT ["/usr/src/certbot-script.sh"]